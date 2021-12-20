import unittest
import json

from mock_server import MockServer
from json_helper import get_json_from_file

def get_machine1():
    return get_json_from_file("static/machine1.json")

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        test_app = MockServer('MockServer')
        test_app.app.config['TESTING'] = True
        test_app.add_endpoint(endpoint='/machine1', endpoint_name='machine1', response=get_machine1)

        self.app = test_app.app.test_client()

    def test_machine_endpoint(self):
        r = self.app.get('/machine1')
        
        decoded_data = r.data.decode("utf-8")  
        json_info = json.loads(decoded_data)

        exists = True if json_info['machineID'] != None else False
        self.assertTrue(exists)

if __name__ == '__main__':
    unittest.main()