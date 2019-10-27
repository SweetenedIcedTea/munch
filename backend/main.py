from aiohttp import web

from logic import Backend
from server import Handler

def main():
    backend = Backend()
    handler = Handler(backend)

    app = web.Application()
    app.add_routes([
        web.get('/', handler.handle_home),
        web.get('/menu/{menu_id}', handler.handle_menu),
        web.post('/order', handler.handle_order),
        web.post('/echo', handler.handle_echo),
        web.get('/rest', handler.handle_websocket)])
    web.run_app(app, port=80)

if __name__ == '__main__':
    main()
