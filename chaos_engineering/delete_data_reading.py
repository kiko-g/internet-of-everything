import requests

""" request = requests.get("http://localhost:8000/machine1",
                headers= {
                    "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0"
                }
            ) """




request = requests.post('http://localhost:8000/fault', json={"key": "value"})

#print(request.json())
