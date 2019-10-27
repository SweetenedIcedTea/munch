from aiohttp import web
from asyncio import Queue

from logic import Backend

def read_file(path):
    with open(path) as f:
        return f.read()

class Handler:
    def __init__(self, backend):
        self.backend = backend

    async def handle_index_get(self, request):
        if 'customer_id' in request.cookies:
            customer_id = int(request.cookies['customer_id'])
            return web.Response(text = "Hi, customer %d" % customer_id)
        else:
            return web.Response(body = read_file('../adminwebpage/customerPages/main.html'), content_type = 'text/html')

    async def handle_index_post(self, request):
        name = (await request.read()).decode().split('=', maxsplit=1)[1]
        customer_id = self.backend.register_customer(name)
        headers = {'Set-Cookie': 'customer_id=%d'%customer_id}
        html = read_file('redirect.html').format(target = '/')
        return web.Response(body = html, content_type = 'text/html', headers = headers)

    async def handle_websocket(self, request):
        rest_id = int(request.cookies['rest_id'])
        ws = web.WebSocketResponse()
        await ws.prepare(request)
        
        queue = Queue()
        self.backend.register_rest(rest_id, queue)

        while True:
            item = await queue.get()
            try:
                await ws.send_str(item)
            except RuntimeError:
                self.backend.unregister_rest(rest_id)
                return

    async def handle_menu(self, request):
        menu_id = request.match_info.get('menu_id')
        customer_id = request.cookies['customer_id']
        result = self.backend.handle_menu(menu_id, customer_id)
        return web.Response(text = result)

    async def handle_order(self, request):
        json = await request.read()
        result = self.backend.handle_order(json.decode())
        return web.Response(text = result)

    async def handle_echo(self, request):
        got_stuff = await request.read()
        return web.Response(body = got_stuff)

    async def handle_rest_page_get(self, request):
        if 'rest_id' in request.cookies:
            rest_id = int(request.cookies['rest_id'])
            return web.Response(body = self.backend.get_rest_page_html(rest_id), content_type = 'text/html')
        else:
            return web.Response(body = read_file('../adminwebpage/restuarantPages/main.html'), content_type = 'text/html')

    async def handle_rest_page_post(self, request):
        rest_id = int((await request.read()).decode().split('&', maxsplit=1)[0].split('=', maxsplit=1)[1])
        if self.backend.verify_rest(rest_id):
            headers = {'Set-Cookie': 'rest_id=%d'%rest_id}
            html = read_file('redirect.html').format(target = '/rest_page')
            return web.Response(body = html, content_type = 'text/html', headers = headers)
        else:
            return web.Response(body = read_file('../adminwebpage/restuarantPages/main.html'), content_type = 'text/html')

