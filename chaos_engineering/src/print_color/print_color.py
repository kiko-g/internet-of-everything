""" print helper """
# pylint: skip-file


class TerminalColor:
    """ Terminal colors """
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    ORAGE_WARNING = '\033[33m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def print_color(text, color):
    """ Print to terminal with a color """
    print(f'{color}{text}{TerminalColor.ENDC}')
