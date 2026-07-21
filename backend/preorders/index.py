"""Управление предзаказами: приём заявок с сайта и просмотр в админке."""
import json
import os
import hmac
import hashlib
import time
import psycopg2
from psycopg2.extras import RealDictCursor

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token, X-Authorization',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
}


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
    return str(s).replace("'", "''")


def _resp(status: int, body) -> dict:
    return {'statusCode': status, 'headers': CORS_HEADERS, 'body': json.dumps(body, default=str)}


def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''

    if method == 'POST':
        try:
            body = json.loads(event.get('body') or '{}')
        except Exception:
            return _resp(400, {'error': 'Invalid JSON'})

        name = (body.get('name') or '').strip()
        phone = (body.get('phone') or '').strip()
        if not name or not phone:
            return _resp(400, {'error': 'Имя и телефон обязательны'})

        event_type = (body.get('event_type') or '').strip()[:100]
        event_date = (body.get('event_date') or '').strip()[:20]
        guests_raw = body.get('guests_count')
        try:
            guests = int(guests_raw) if guests_raw not in (None, '', 0) else None
        except (ValueError, TypeError):
            guests = None
        budget = (body.get('budget') or '').strip()[:100]
        details = (body.get('details') or '').strip()[:2000]
        contact_method = (body.get('contact_method') or 'phone').strip()[:20]
        if contact_method not in ('phone', 'max', 'telegram', 'whatsapp'):
            contact_method = 'phone'

        date_sql = f"'{_escape(event_date)}'" if event_date else 'NULL'
        guests_sql = str(guests) if guests is not None else 'NULL'

        with _conn() as c:
            with c.cursor() as cur:
                cur.execute(
                    f"INSERT INTO {SCHEMA}.preorders (name, phone, event_type, event_date, guests_count, budget, details, contact_method) "
                    f"VALUES ('{_escape(name)[:255]}', '{_escape(phone)[:50]}', '{_escape(event_type)}', "
                    f"{date_sql}, {guests_sql}, '{_escape(budget)}', '{_escape(details)}', '{_escape(contact_method)}') RETURNING id"
                )
                new_id = cur.fetchone()[0]
                c.commit()
        return _resp(200, {'ok': True, 'id': new_id})

    if method == 'GET':
        if not _verify_token(token):
            return _resp(401, {'error': 'Unauthorized'})
        with _conn() as c:
            with c.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    f"SELECT id, name, phone, event_type, event_date, guests_count, budget, details, status, created_at, contact_method "
                    f"FROM {SCHEMA}.preorders ORDER BY created_at DESC LIMIT 500"
                )
                rows = [dict(r) for r in cur.fetchall()]
        return _resp(200, {'preorders': rows})

    if method == 'PATCH':
        if not _verify_token(token):
            return _resp(401, {'error': 'Unauthorized'})
        try:
            body = json.loads(event.get('body') or '{}')
        except Exception:
            return _resp(400, {'error': 'Invalid JSON'})
        pid = int(body.get('id') or 0)
        status_val = (body.get('status') or '').strip()[:50]
        if not pid or not status_val:
            return _resp(400, {'error': 'id и status обязательны'})
        with _conn() as c:
            with c.cursor() as cur:
                cur.execute(
                    f"UPDATE {SCHEMA}.preorders SET status = '{_escape(status_val)}' WHERE id = {pid}"
                )
                c.commit()
        return _resp(200, {'ok': True})

    if method == 'DELETE':
        if not _verify_token(token):
            return _resp(401, {'error': 'Unauthorized'})
        qs = event.get('queryStringParameters') or {}
        pid = int(qs.get('id') or 0)
        if not pid:
            return _resp(400, {'error': 'id обязателен'})
        with _conn() as c:
            with c.cursor() as cur:
                cur.execute(f"DELETE FROM {SCHEMA}.preorders WHERE id = {pid}")
                c.commit()
        return _resp(200, {'ok': True})

    return _resp(405, {'error': 'Method not allowed'})