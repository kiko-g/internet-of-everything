# How to run (while dockerfile is not setup):

1. Install Mosquitto MQTT Broker *(default port is 1883)* 
    > sudo apt-add-repository ppa:mosquitto-dev/mosquitto-ppa
    > sudo apt-get update
    > sudo apt-get install mosquitto
    > sudo apt-get install mosquitto-clients
    > sudo apt clean
    > sudo service mosquitto <start|stop>
2. > gradle build
3. Start the **Machine Listener**
    > gradle runMachineListener
4. Open a new terminal and start the **Temperature Sensor**
    > gradle runTemperatureSensor