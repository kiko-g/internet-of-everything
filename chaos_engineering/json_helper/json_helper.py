import json

def get_json_from_file(filepath):
    with open(filepath, 'r') as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
        return json.dumps(jsonObject)

def get_dict_from_req(req):
    return json.loads(req.data.decode("utf8"))