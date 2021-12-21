"""
This module launches and configures the mock server for chaos enginnering testing
"""
import sys
import json
from mock_server import MockServer, get_last_request
import json_helper


def get_machine1():
    """ Machine 1 request handler """
    return json_helper.get_json_from_file('static/machine1.json')

def get_machine2():
    """ Machine 2 request handler """
    return json_helper.get_json_from_file('static/machine2.json')

def fault_central_handler(fault_storage):
    """ fault and central routes request handler """
    req = get_last_request()
    if req.method == 'POST':
        req_data = json_helper.get_dict_from_req(req)
        fault_storage[int(req_data['machineID'])] = req_data
        print(f"Received {int(req_data['machineID'])} post", file=sys.stdout)
        return None

    if req.method == 'GET' and 'machineID' in req.args:
        if req.args['machineID'] and req.args['machineID'].isnumeric():
            machine_id = int(req.args['machineID'])
            if machine_id in fault_storage:
                return json.dumps(fault_storage[machine_id])

    return None

def main():
    """ Launch mock server """
    central_storage = {}
    fault_storage = {}

    server = MockServer(8000)
    server.add_endpoint(endpoint='/machine1', endpoint_name='machine1', handler=get_machine1)
    server.add_endpoint(endpoint='/machine2', endpoint_name='machine2', handler=get_machine2)

    central_lambda = lambda: fault_central_handler(central_storage)
    server.add_endpoint(endpoint='/central', endpoint_name='central',
                        handler=central_lambda, methods=['GET', 'POST'])

    fault_lambda = lambda: fault_central_handler(fault_storage)
    server.add_endpoint(endpoint='/fault', endpoint_name='fault',
                        handler=fault_lambda, methods=['GET', 'POST'])

    server.run()

if __name__ == '__main__':
    main()
