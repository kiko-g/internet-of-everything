"""
This module launches a basic cli in order to select the script to execute
"""

import subprocess

SCRIPTS = ["display_over_pressure.py",
           "display_overheating.py",
           "display_overvibration.py",
           "python3 ddos_overload.py",
           "fake_data_reading.py",
           "incoherent_output_data.py",
           "negative_values.py"]


def check_input(lower_limit, upper_limit, kind):
    """ Check input """
    while True:
        print(f"Enter your {kind} choice:")
        choice = input()
        try:
            choice = int(choice)
        except ValueError:
            print('Please use numeric digits.')
            continue
        if choice < lower_limit or choice > upper_limit:
            print(
                f'Please enter number between {lower_limit} and {upper_limit}.')
            continue
        break

    return choice


def main():
    """ Launch cli script """
    choice = True
    while choice:
        print("""
              Choose script to launch
              1. Over pressure
              2. Over heating
              3. Over vibration
              4. Ddos overload
              5. Fake data reading
              6. Incoherent output data
              7. Modify data format
              8. Negative values
              9. Exit
              """)

        choice = check_input(1, 9, "script")

        if choice == 9:
            print("\nExit successful")
            break

        machine = check_input(1, 1, "machine")

        if choice < 4:
            subprocess.call(
                f"python3 {SCRIPTS[choice]} {machine}",
                shell=True)
            print("\nScript launched")
        else:
            subprocess.call(f"python3 {SCRIPTS[choice]}",
                            shell=True)
            print("\nScript launched")


if __name__ == '__main__':
    main()
