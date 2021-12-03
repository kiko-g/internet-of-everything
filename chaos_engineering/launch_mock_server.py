from mock_server import MockServer
from json_helper import get_json_from_file

server = MockServer(8000)


def get_machine1():
    return get_json_from_file("static/machine1.json")

def get_machine2():
    return get_json_from_file("static/machine2.json")

def central_handler():
    print("central handler")

def central_response():
    return "received json data"

def fault_handler():
    print("central handler")

def fault_response():
    return "received json data"

def main():
    server.add_endpoint(endpoint='/machine1', endpoint_name='machine1', response=get_machine1)
    server.add_endpoint(endpoint='/machine2', endpoint_name='machine2', response=get_machine2)
    server.add_endpoint(endpoint='/central', endpoint_name='central', handler=central_handler, response=central_response)
    server.add_endpoint(endpoint='/fault', endpoint_name='fault', handler=fault_handler, response=fault_response)

    server.run()

if __name__ == '__main__':
    main()
