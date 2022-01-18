"""
This module contains the mock server class used to test the project's scripts
"""
from flask import Flask, Response, request

class EndpointAction():
    """ Endpoint action for mock server """
    def __init__(self, action):
        self.action = action

    def __call__(self, *args):
        """ return json dump from file """
        if self.action:
            return Response(status=200,
                            headers={}, mimetype='application/json', response=self.action())
        return None

    def get_action(self):
        """ return endpoint action """
        return self.action


class MockServer():
    """ Mock web server """
    app = None

    def __init__(self, port):
        self.port = port
        self.app = Flask('MockServer')

    def run(self):
        """ starts mock server """
        self.app.run(port=self.port)

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None, methods=None):
        """ add endpoint to mock server """
        self.app.add_url_rule(endpoint, endpoint_name, EndpointAction(handler), methods=methods)

def get_last_request():
    """ get the last http request """
    return request
