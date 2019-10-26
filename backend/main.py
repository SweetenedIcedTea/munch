import http_server

class Backend:
    def __init__(self):
        pass
    
    def handle_order(self, json_data):
        # TODO: actually tell restaurants the thing
        return b"Returned data!"

    # ...

def main():
    backend = Backend()

    global backend

    http_server.serve_http()

if __name__ == '__main__':
    main()
