"""
negative_values
"""
import sys
import random
import datetime
from mqtt_handler import MQTTHandler

def generate_machine_id(number_machines):
    """generate random machine_id"""
    return random.randint(-number_machines, number_machines)

def generate_temperature():
    """generate random temperature"""
    return random.randint(-300, 1000)

def generate_pieces_produced():
    """generate random number of pieces produced"""
    return random.randint(-300, 1000)

def generate_sensor_id():
    """generate random sensor id"""
    return random.randint(-100,100)

def generate_position_x():
    """generate random coordinates for x"""
    return random.randint(-1000,1000)

def generate_position_y():
    """generate random coordinates for y"""
    return random.randint(-1000,1000)

def generate_velocity():
    """generate random velocity"""
    return random.randrange(-100,100)

def generate_orientation():
    """generate orientation"""
    return random.randint(-360,360)

def generate_vibration():
    """generate random vibration"""
    return random.randrange(-500,500)

def generate_energy():
    """generate random energy"""
    return random.randrange(-1000,1000)

def generate_reading_time():
    """generate random reading time"""

    hours = random.randint(-100, 100)

    date = datetime.datetime.now()

    hours_added = datetime.timedelta(hours=hours)

    date = date + hours_added

    return date.isoformat()


def negative_values():
    """generate json of random values"""
    number_machines = 5000

    data = {
        "machineID": generate_machine_id(number_machines),
        "sensorID": generate_sensor_id(),
        "values": {
            "x": generate_position_x(),
            "y": generate_position_y(),
            "velocity": generate_velocity(),
            "orientation": generate_orientation(),
            "temperature": generate_temperature(),
            "vibration": generate_vibration(),
            "productionSpeed": generate_pieces_produced(),
            "energy": generate_energy()
        },
        "reading-time": generate_reading_time()
    }
    return data


def main():
    """main"""
    post_data = negative_values()

    machine_1 = f'm{sys.argv[1]}'
    mqtt = MQTTHandler("localhost", 1883, True)
    mqtt.start()
    mqtt.subscribe(f"machine/{machine_1}")

    mqtt.publish(f"machine/{machine_1}", post_data, 10, 1, 50)

    mqtt.stop()  # stop mqtt thread in the background


if __name__ == '__main__':
    main()
