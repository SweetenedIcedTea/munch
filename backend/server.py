from aiohttp import web
from asyncio import Queue

from logic import Backend

class Handler:
    def __init__(self, backend):
        self.backend = backend

    async def handle_home(self, request):
        return web.Response(text = "Hi there")

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
        result = self.backend.handle_menu(menu_id)
        return web.Response(text = result)

    async def handle_order(self, request):
        json = await request.read()
        result = self.backend.handle_order(json.decode())
        return web.Response(text = result)

