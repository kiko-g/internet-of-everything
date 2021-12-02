from mock_server import MockServer
import json

def get_machine1():
    with open("static/machine1.json", 'r') as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
        return json.dumps(jsonObject)

server = MockServer(8000)
server.add_endpoint(endpoint='/machine1', endpoint_name='machine1', response=get_machine1)
server.run()
