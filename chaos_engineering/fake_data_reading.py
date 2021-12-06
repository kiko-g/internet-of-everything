import json
import requests
import random



def getRandomNumber(min, max):
    return random.randint(min,max)

def create_fake_data_reading():
    fake_reading = {"machineID": getRandomNumber(0,1000), "reading-time": getRandomNumber(0,100000000000), "properties": {"status": getRandomNumber(0,1000), "temperature": getRandomNumber(0,1000), "piecesProduced": getRandomNumber(0,1000), "volt": getRandomNumber(0,1000), "vibration": getRandomNumber(0,1000), "pressure": getRandomNumber(0,1000), "rotate": getRandomNumber(0,1000)}}
    json_fake_reading = json.dumps(fake_reading)
    return json_fake_reading


def main():
    json_reading = create_fake_data_reading()
    print(json_reading)
    requests.post('http://localhost:8000/fault', json_reading)


if __name__ == '__main__':
    main()
