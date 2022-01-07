"""
This module calls another modules to inject sequential errors for a target machine
"""

from random import randrange
import os


def main():
    """ Launch inject sequential errors script"""
    machine_id = -1
    repetition = -1

    # Control cycle to check if the machine ID is not negative and different
    # from int
    while machine_id < 1:
        while True:
            try:
                machine_id = int(input("Please insert the machine_id: "))
                break
            except ValueError:
                print("Please input integer only...")
                continue
    # Control cycle to check if the repetition number is not negative and
    # different from int
    while repetition < 1:
        while True:
            try:
                repetition = int(
                    input("Please insert the number of repetitions: "))
                break
            except ValueError:
                print("Please input integer only...")
                continue
    rand = randrange(3)
    for _ in range(0, repetition):
        if rand == 0:
            os.system("python3 display_overheating.py " + machine_id)
        elif rand == 1:
            os.system("python3 display_over_pressure.py " + machine_id)
        else:
            os.system("python3 display_overvibration.py " + machine_id)


if __name__ == '__main__':
    main()
