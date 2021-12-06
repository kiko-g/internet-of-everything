import json
import random
import string
import datetime


#//null means that the field is optional, 
#//may not be present depending on the other fields
#//ex.: If the status is ok, there's no error description
#{
#    //Unique identifyer of each machine
#    "machineID": int
#    //Danger level
#    //OK - No error
#    //Warning - Error may occur in the future
#    //Critical - An error is about to occur
#    //Failed - With the current reading the machine should already have failed 
#    "status": "Ok" | "Warning" | "Critical" | "Failed",
#    //Estimated time to fail if error is not fixed
#    //Null if the current state will not lead to fail
#    "time-untill-failure": null | datetime
#    //Unique identifier of common errors
#    "errorID": int
#    //Description
#    //Null if status is ok, there's no description needed
#    "description": null | string
#}




def addHours(hours):


    current_date_and_time = datetime.datetime.now()

    hours_added = datetime.timedelta(hours = hours)

    future_date_and_time = current_date_and_time + hours_added

    return(future_date_and_time)

def getRandomNumber(min, max):
    return random.randint(min,max)

def getRandomString(n):
    #random string with n characters
    letters = string.ascii_lowercase
    return (''.join(random.choice(letters) for i in range(n)))

def getRandomString():
    #random string with random length between 1 and 40
    letters = string.ascii_lowercase
    return (''.join(random.choice(letters) for i in range(getRandomNumber(1,40))))
    
def generateMachineId(number_machines):
    varType = getRandomNumber(1,4)

    #machineId has 50% chance of giving a value of int type and 50% og string/bool

    if varType == 1 or varType == 2:
        #random int
        return getRandomNumber(0, number_machines)


    elif varType == 3:
        #random string
        return getRandomString()
    
    elif varType == 4:
        randomBoolean = getRandomNumber(1,2)
        if randomBoolean == 1:
            return True
        else:
            return False

def getRandomStatus():
    n = getRandomNumber(1, 4)
    if n == 1:
        return "OK"
    elif n==2:
        return "Critical"
    elif n==3:
        return "Warning"
    elif n==4:
        return "Failure"
    
def generateEstimateFail():
    n = getRandomNumber(1,6)
    if n==1 or n==2:
        return "Null"
    elif n==3 or n==4:
        return addHours(getRandomNumber(0,48))
    elif n==5:
        return getRandomString()
    elif n==6:
        if getRandomNumber(1,2) == 1:
            return True
        else:
            return False

def generateErrorId():
    n = getRandomNumber(1,6)
    if n==1 or n==2 or n==3:
        return getRandomNumber(1,1000)

    elif n==4:
        return getRandomString()

    elif n==5:

        if getRandomNumber(1,2) == 1:
            return True
        else:
            return False

def generateDescription():
    n = getRandomNumber(1,5)
    if n==1 or n==2:
        return getRandomString()
    elif n==3:
        return "Null"
    elif n==4:
        return getRandomNumber(1, 1000)
    elif n==5:
        if getRandomNumber(1,2) == 1:
            return True
        else:
            return False

def incoherent_output_data():

    number_machines = 5000


    data = {
        "machineID":(generateMachineId(number_machines)),
        "status":(getRandomStatus()),
        "time-untill-failure":(generateEstimateFail()),
        "errorID": generateErrorId(),
        "description": generateDescription()
    }

    #print("machineID: " + str(data["machineID"]))
    #print("status: " + str(data["status"]))
    #print("time-untill-failure: " + str(data["time-untill-failure"]))
    #print("errorID: " + str(data["errorID"]))
    #print("description: " + str(data["description"]))
    #print('\n')
    return data

if __name__ == '__main__':
    incoherent_output_data()



