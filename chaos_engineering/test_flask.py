"""
This module is used for automated unit tests
"""
import unittest
import json

from mock_server import MockServer
from launch_mock_server import get_machine1


class FlaskAppTests(unittest.TestCase):
    """ Unit test class for the mock server """
    def setUp(self):
        """ Setup unit tests """
        test_app = MockServer('MockServer')
        test_app.app.config['TESTING'] = True
        test_app.add_endpoint(endpoint='/machine1', endpoint_name='machine1', handler=get_machine1)

        self.app = test_app.app.test_client()

    def test_machine_endpoint(self):
        """ endpoint test """
        req = self.app.get('/machine1')

        decoded_data = req.data.decode("utf-8")
        json_info = json.loads(decoded_data)

        exists = bool(json_info['machineID'] is not None)
        self.assertTrue(exists)

if __name__ == '__main__':
    unittest.main()
