from flask import Flask, Response

class EndpointAction(object):

    def __init__(self, action, response):
        self.action = action
        if response:
          response_content = response()
        self.response = Response(status=200, headers={}, mimetype='application/json', response=response_content)

    def __call__(self, *args):
        if self.action:
          self.action()
        return self.response


class MockServer(object):
    app = None

    def __init__(self, port):
        self.port = port
        self.app = Flask('MockServer')

    def run(self):
        self.app.run(port=self.port)

    def add_endpoint(self, endpoint=None, endpoint_name=None, handler=None, response=None):
        self.app.add_url_rule(endpoint, endpoint_name, EndpointAction(handler, response))
