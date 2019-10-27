from aiohttp import web

from logic import Backend
from server import Handler

def main():
    backend = Backend()
    handler = Handler(backend)

    app = web.Application()
    app.add_routes([
        web.get('/', handler.handle_index),
        web.post('/', handler.handle_post_index),
        web.get('/menu/{menu_id}', handler.handle_menu),
        web.post('/order', handler.handle_order),
        web.post('/echo', handler.handle_echo),
        web.get('/rest', handler.handle_websocket),
        web.get('/login', handler.handle_login),
        web.post('/rest_page', handler.handle_rest_page),
        web.static('/resources', 'resources')])
    web.run_app(app, port=80)

if __name__ == '__main__':
    main()
