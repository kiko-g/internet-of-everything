"""
This module contains helper functions related to json handling
"""

import json

def get_json_from_file(filepath):
    """ return json dump from file """
    with open(filepath, 'r', encoding='utf8') as json_file:
        json_object = json.load(json_file)
        json_file.close()
        return json.dumps(json_object)

def get_dict_from_req(req):
    """ Returns dictionary from get request json """
    return json.loads(req.data.decode("utf8"))
