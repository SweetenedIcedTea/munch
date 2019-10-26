import http.server
from http.server import HTTPServer, SimpleHTTPRequestHandler

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        self.log_message("Wow it's POST " + self.path) 
        data = b"hey it's the data"
        self.send_response(200)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

def main():
    server = HTTPServer(('', 80), MyHTTPRequestHandler)

    server.serve_forever()

if __name__ == '__main__':
    main()
