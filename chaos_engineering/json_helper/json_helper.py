import json

def get_json_from_file(filepath):
    with open(filepath, 'r') as jsonFile:
        jsonObject = json.load(jsonFile)
        jsonFile.close()
        return json.dumps(jsonObject)
