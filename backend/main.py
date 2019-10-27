from aiohttp import web

from logic import Backend
from server import Handler

def main():
    backend = Backend()
    handler = Handler(backend)

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
        web.static('/qrloader.js', '../static_stuff/qrloader.js'),
        web.static('/static', '../static_stuff/static')
        ])
    web.run_app(app, port=80)

if __name__ == '__main__':
    main()
