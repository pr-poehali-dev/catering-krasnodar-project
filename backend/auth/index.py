import json
import os
import hashlib
import hmac
import time

def handler(event: dict, context) -> dict:
    '''Авторизация админа по паролю. Возвращает токен сессии.'''
    method = event.get('httpMethod', 'GET')

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

    headers_common = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }

    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    if not admin_password:
        return {
            'statusCode': 500,
            'headers': headers_common,
            'body': json.dumps({'error': 'ADMIN_PASSWORD not set'}),
        }

    if method == 'POST':
        try:
            body = json.loads(event.get('body') or '{}')
        except Exception:
            body = {}
        password = (body.get('password') or '').strip()

        if not password or password != admin_password:
            return {
                'statusCode': 401,
                'headers': headers_common,
                'body': json.dumps({'error': 'Неверный пароль'}),
            }

        ts = str(int(time.time()))
        sig = hmac.new(
            admin_password.encode('utf-8'),
            ts.encode('utf-8'),
            hashlib.sha256,
        ).hexdigest()
        token = f'{ts}.{sig}'

        return {
            'statusCode': 200,
            'headers': headers_common,
            'body': json.dumps({'token': token}),
        }

    return {
        'statusCode': 405,
        'headers': headers_common,
        'body': json.dumps({'error': 'Method not allowed'}),
    }
