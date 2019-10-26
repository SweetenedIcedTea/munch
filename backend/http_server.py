import http.server
from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        self.log_message("Wow it's POST " + self.path) 
        read_length = int(self.headers['Content-Length'])
        read_data = self.rfile.read(read_length)

        # Determine how to handle the data ...
        respond_data = read_data if self.path == '/echo' else backend.handle_order(read_data)

        self.send_response(200)
        self.send_header("Content-Length", str(len(respond_data)))
        self.end_headers()
        self.wfile.write(respond_data)

def serve_http():
    server = HTTPServer(('', 80), MyHTTPRequestHandler)
    server.serve_forever()

