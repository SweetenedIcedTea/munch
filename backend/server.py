from aiohttp import web
from asyncio import Queue

from logic import Backend

class Handler:
    def __init__(self, backend):
        self.backend = backend

    async def handle_index(self, request):
        if 'customer_id' in request.cookies:
            customer_id = int(request.cookies['customer_id'])
            return web.Response(text = "Hi, customer %d" % customer_id)
        else:
            with open('login.html') as f:
                html = f.read()
            return web.Response(body = html, content_type = 'text/html')

    async def handle_post_index(self, request):
        name = (await request.read()).decode().split('=', maxsplit=1)[1]
        customer_id = self.backend.register_customer(name)
        headers = {'Set-Cookie': 'customer_id=%d'%customer_id}
        return web.Response(text = "Your new id is %d" % customer_id, headers = headers)

    async def handle_websocket(self, request):
        ws = web.WebSocketResponse()
        await ws.prepare(request)

        rest_id = int(await ws.receive_str())
        
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

    async def handle_login(self, request):
        with open('login.html') as f:
            content = f.read()
        return web.Response(body = content, content_type = 'text/html')

    async def handle_rest_page(self, request):
        rest_id = int((await request.read()).decode().split('&', maxsplit=1)[0].split('=', maxsplit=1)[1])
        html = self.backend.get_rest_page_html(rest_id)
        return web.Response(body = content, content_type = 'text/html')

