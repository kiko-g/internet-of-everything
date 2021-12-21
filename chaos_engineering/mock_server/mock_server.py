from flask import Flask, Response, request
import json

class EndpointAction(object):

    def __init__(self, action):
        self.action = action
       
    def __call__(self, *args):
        if self.action:
            return Response(status=200,
                headers={}, mimetype='application/json', response=self.action())


class MockServer(object):
    app = None

    def __init__(self, port):
        self.port = port
        self.app = Flask('MockServer')

    def run(self):
        self.app.run(port=self.port)

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None, methods=None):
        self.app.add_url_rule(endpoint, endpoint_name, EndpointAction(handler), methods=methods)

    def get_last_request(self):
       return request
