import json
import os
import base64
import hmac
import hashlib
import time
import uuid
import boto3


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


def handler(event: dict, context) -> dict:
    '''Загружает изображение в S3 (base64 в JSON), возвращает CDN URL'''
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    common = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''
    if not _verify_token(token):
        return {'statusCode': 401, 'headers': common, 'body': json.dumps({'error': 'Unauthorized'})}

    if method != 'POST':
        return {'statusCode': 405, 'headers': common, 'body': json.dumps({'error': 'Method not allowed'})}

    try:
        body = json.loads(event.get('body') or '{}')
        data_url = body.get('file', '')
        filename = body.get('filename', 'image.jpg')

        if ',' in data_url:
            header, b64data = data_url.split(',', 1)
            ext = 'jpg'
            ctype = 'image/jpeg'
            if 'png' in header:
                ext = 'png'
                ctype = 'image/png'
            elif 'webp' in header:
                ext = 'webp'
                ctype = 'image/webp'
            elif 'jpeg' in header or 'jpg' in header:
                ext = 'jpg'
                ctype = 'image/jpeg'
        else:
            b64data = data_url
            ext = (filename.rsplit('.', 1)[-1] or 'jpg').lower()
            ctype = 'image/' + ('jpeg' if ext == 'jpg' else ext)

        binary = base64.b64decode(b64data)
        key = f'products/{uuid.uuid4().hex}.{ext}'

        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        s3.put_object(Bucket='files', Key=key, Body=binary, ContentType=ctype)

        url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
        return {'statusCode': 200, 'headers': common, 'body': json.dumps({'url': url})}
    except Exception as e:
        return {'statusCode': 500, 'headers': common, 'body': json.dumps({'error': str(e)})}
