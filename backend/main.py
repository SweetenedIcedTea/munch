from aiohttp import web
import ssl

from logic import Backend
from server import Handler

def make_static_js(path):
    async def handler(request):
        with open('../static_stuff' + request.path) as f:
            content = f.read()
        return web.Response(body = content, content_type = 'text/javascript')
    return web.get(path, handler)

def main():
    backend = Backend()
    handler = Handler(backend)

    chain_path = '/home/jbones/fullchain.pem'
    privkey_path = '/home/jbones/privkey.pem'
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
    ssl_context.load_cert_chain(chain_path, privkey_path)


    app = web.Application()
    app.add_routes([
        web.get('/favicon.ico', handler.handle_favicon),
        web.get('/', handler.handle_index_get),
        web.post('/', handler.handle_index_post),
        web.get('/menu/{menu_id}', handler.handle_menu),
        web.post('/order', handler.handle_order),
        web.post('/echo', handler.handle_echo),
        web.get('/rest', handler.handle_websocket),
        web.get('/rest_page', handler.handle_rest_page_get),
        web.post('/rest_page', handler.handle_rest_page_post),
        web.static('/resources', '../adminwebpage/resources'),
        make_static_js('/qrloader.js'),
        make_static_js('/qr-scanner.min.js'),
        make_static_js('/qr-scanner-worker.min.js'),
        web.static('/static', '../static_stuff/static')
        ])
    web.run_app(app, port=443, ssl_context=ssl_context)

if __name__ == '__main__':
    main()
