"""
This module calls another modules to inject sequential errors for a target machine
"""

from random import randrange
import os


def main():
    """ Launch inject sequential errors script"""
    
    machineID = -1
    repetition = -1

    # Control cycle to check if the machine ID is not negative and different from int
    while machineID < 1:
        while True:
            try:
                machineID = int(input("Please insert the machineID: "))
                break
            except ValueError:
                print("Please input integer only...")  
                continue

    # Control cycle to check if the repetition number is not negative and different from int
    while repetition < 1:
        while True:
            try:
                repetition = int(input("Please insert the number of repetitions: "))
                break
            except ValueError:
                print("Please input integer only...")  
                continue

    for i in range (0, repetition):
        rand = randrange(3)
        if rand == 0:
            os.system("python3 display_overheating.py " + machineID)
        elif rand == 1:
            os.system("python3 display_over_pressure.py " + machineID)
        else:
            os.system("python3 display_overvibration.py " + machineID)
        

if __name__ == '__main__':
    main()
