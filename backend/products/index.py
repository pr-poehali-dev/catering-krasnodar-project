import json
import os
import hmac
import hashlib
import time
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')


def _verify_token(token: str) -> bool:
    if not token or '.' not in token:
        return False
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password:
        return False
    try:
        ts, sig = token.split('.', 1)
        if (int(time.time()) - int(ts)) > 60 * 60 * 24 * 30:
            return False
        expected = hmac.new(
            admin_password.encode('utf-8'),
            ts.encode('utf-8'),
            hashlib.sha256,
        ).hexdigest()
        return hmac.compare_digest(expected, sig)
    except Exception:
        return False


def _conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _escape(s: str) -> str:
    return s.replace("'", "''")


def _list_products():
    with _conn() as c:
        with c.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                f"SELECT id, name, description, price, category, portion, badge, sort_order, is_active, created_at "
                f"FROM {SCHEMA}.products WHERE is_active = true ORDER BY sort_order ASC, id DESC"
            )
            products = [dict(r) for r in cur.fetchall()]
            if not products:
                return []
            ids = ','.join(str(p['id']) for p in products)
            cur.execute(
                f"SELECT id, product_id, url, sort_order FROM {SCHEMA}.product_images "
                f"WHERE product_id IN ({ids}) ORDER BY product_id, sort_order"
            )
            imgs = [dict(r) for r in cur.fetchall()]
            cur.execute(
                f"SELECT id, product_id, author_name, rating, text, event, created_at FROM {SCHEMA}.product_reviews "
                f"WHERE product_id IN ({ids}) ORDER BY created_at DESC"
            )
            revs = [dict(r) for r in cur.fetchall()]

            by_id = {p['id']: {**p, 'images': [], 'reviews': []} for p in products}
            for img in imgs:
                if img['product_id'] in by_id:
                    by_id[img['product_id']]['images'].append({'id': img['id'], 'url': img['url'], 'sort_order': img['sort_order']})
            for r in revs:
                if r['product_id'] in by_id:
                    by_id[r['product_id']]['reviews'].append({
                        'id': r['id'],
                        'author_name': r['author_name'],
                        'rating': r['rating'],
                        'text': r['text'],
                        'event': r['event'],
                        'created_at': r['created_at'].isoformat() if r['created_at'] else None,
                    })
            for p in by_id.values():
                if p.get('created_at'):
                    p['created_at'] = p['created_at'].isoformat()
            return list(by_id.values())


def _create_product(data: dict):
    name = _escape(str(data.get('name', '')).strip())
    description = _escape(str(data.get('description', '') or ''))
    price = int(data.get('price') or 0)
    category = _escape(str(data.get('category', '') or ''))
    portion = _escape(str(data.get('portion', '') or ''))
    badge = _escape(str(data.get('badge', '') or ''))
    sort_order = int(data.get('sort_order') or 0)
    images = data.get('images') or []

    with _conn() as c:
        with c.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                f"INSERT INTO {SCHEMA}.products (name, description, price, category, portion, badge, sort_order) "
                f"VALUES ('{name}', '{description}', {price}, '{category}', '{portion}', '{badge}', {sort_order}) RETURNING id"
            )
            pid = cur.fetchone()['id']
            for i, url in enumerate(images):
                if not url:
                    continue
                cur.execute(
                    f"INSERT INTO {SCHEMA}.product_images (product_id, url, sort_order) "
                    f"VALUES ({pid}, '{_escape(str(url))}', {i})"
                )
            c.commit()
            return {'id': pid}


def _update_product(pid: int, data: dict):
    name = _escape(str(data.get('name', '')).strip())
    description = _escape(str(data.get('description', '') or ''))
    price = int(data.get('price') or 0)
    category = _escape(str(data.get('category', '') or ''))
    portion = _escape(str(data.get('portion', '') or ''))
    badge = _escape(str(data.get('badge', '') or ''))
    sort_order = int(data.get('sort_order') or 0)
    images = data.get('images') or []

    with _conn() as c:
        with c.cursor() as cur:
            cur.execute(
                f"UPDATE {SCHEMA}.products SET name='{name}', description='{description}', price={price}, "
                f"category='{category}', portion='{portion}', badge='{badge}', sort_order={sort_order}, "
                f"updated_at=CURRENT_TIMESTAMP WHERE id={pid}"
            )
            cur.execute(f"UPDATE {SCHEMA}.product_images SET sort_order=-1 WHERE product_id={pid}")
            for i, url in enumerate(images):
                if not url:
                    continue
                u = _escape(str(url))
                cur.execute(
                    f"SELECT id FROM {SCHEMA}.product_images WHERE product_id={pid} AND url='{u}' LIMIT 1"
                )
                row = cur.fetchone()
                if row:
                    cur.execute(f"UPDATE {SCHEMA}.product_images SET sort_order={i} WHERE id={row[0]}")
                else:
                    cur.execute(
                        f"INSERT INTO {SCHEMA}.product_images (product_id, url, sort_order) "
                        f"VALUES ({pid}, '{u}', {i})"
                    )
            cur.execute(f"UPDATE {SCHEMA}.product_images SET sort_order=999 WHERE product_id={pid} AND sort_order=-1")
            c.commit()
            return {'id': pid}


def _delete_product(pid: int):
    with _conn() as c:
        with c.cursor() as cur:
            cur.execute(f"UPDATE {SCHEMA}.products SET is_active=false WHERE id={pid}")
            c.commit()
    return {'ok': True}


def _add_review(pid: int, data: dict):
    author = _escape(str(data.get('author_name', '')).strip()[:100])
    text = _escape(str(data.get('text', '')).strip())
    event = _escape(str(data.get('event', '') or '')[:200])
    rating = int(data.get('rating') or 5)
    if rating < 1 or rating > 5:
        rating = 5
    if not author or not text:
        return None
    with _conn() as c:
        with c.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                f"INSERT INTO {SCHEMA}.product_reviews (product_id, author_name, rating, text, event) "
                f"VALUES ({pid}, '{author}', {rating}, '{text}', '{event}') RETURNING id"
            )
            rid = cur.fetchone()['id']
            c.commit()
            return {'id': rid}


def _delete_review(rid: int):
    with _conn() as c:
        with c.cursor() as cur:
            cur.execute(f"DELETE FROM {SCHEMA}.product_reviews WHERE id={rid}")
            c.commit()
    return {'ok': True}


def handler(event: dict, context) -> dict:
    '''CRUD товаров каталога: список, создание, обновление, удаление, отзывы'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    common = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''
    is_admin = _verify_token(token)
    qs = event.get('queryStringParameters') or {}
    action = (qs.get('action') or '').lower()

    try:
        if method == 'GET':
            return {'statusCode': 200, 'headers': common, 'body': json.dumps({'products': _list_products()}, default=str)}

        body = json.loads(event.get('body') or '{}')

        if action == 'review' and method == 'POST':
            pid = int(qs.get('product_id') or body.get('product_id') or 0)
            if pid <= 0:
                return {'statusCode': 400, 'headers': common, 'body': json.dumps({'error': 'product_id required'})}
            res = _add_review(pid, body)
            if not res:
                return {'statusCode': 400, 'headers': common, 'body': json.dumps({'error': 'Заполните имя и текст отзыва'})}
            return {'statusCode': 200, 'headers': common, 'body': json.dumps(res)}

        if not is_admin:
            return {'statusCode': 401, 'headers': common, 'body': json.dumps({'error': 'Unauthorized'})}

        if action == 'review' and method == 'DELETE':
            rid = int(qs.get('id') or 0)
            return {'statusCode': 200, 'headers': common, 'body': json.dumps(_delete_review(rid))}

        if method == 'POST':
            return {'statusCode': 200, 'headers': common, 'body': json.dumps(_create_product(body))}

        if method == 'PUT':
            pid = int(qs.get('id') or body.get('id') or 0)
            return {'statusCode': 200, 'headers': common, 'body': json.dumps(_update_product(pid, body))}

        if method == 'DELETE':
            pid = int(qs.get('id') or 0)
            return {'statusCode': 200, 'headers': common, 'body': json.dumps(_delete_product(pid))}

        return {'statusCode': 405, 'headers': common, 'body': json.dumps({'error': 'Method not allowed'})}
    except Exception as e:
        return {'statusCode': 500, 'headers': common, 'body': json.dumps({'error': str(e)})}
