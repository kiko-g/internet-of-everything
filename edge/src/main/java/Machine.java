import Sensors.*;
import org.eclipse.paho.mqttv5.client.IMqttToken;
import org.eclipse.paho.mqttv5.client.MqttDisconnectResponse;
import org.eclipse.paho.mqttv5.common.MqttException;
import org.eclipse.paho.mqttv5.common.MqttMessage;
import org.eclipse.paho.mqttv5.common.packet.MqttProperties;
import org.json.JSONObject;
import java.io.IOException;
import java.io.File;
import java.nio.file.Files;

import java.util.ArrayList;

public class Machine extends MQTTClient implements Runnable {
    Thread thread;
    String name;

    Long status;
    Long defectProbability;
    String input;
    String output;
    Long timePerBatch;
    String nextMachineID;
    String machineTopic;
    String productTopic;
    ArrayList<Sensor> sensors; // maybe change to hashmap with sensor's names

    Machine(String id, Long machineStatus, Long defectProb, String machineInput, String machineOutput, Long timeBatch, String nextMachine, byte[] config) {
        super(id);
        this.name = id;
        this.status = machineStatus;
        this.defectProbability = defectProb;
        this.input = machineInput;
        this.output = machineOutput;
        this.timePerBatch = timeBatch;
        this.nextMachineID = nextMachine;
        this.machineTopic = "machine/" + id;
        this.productTopic = "product/" + id;
        this.publishMessage("startup", config);
    }


    public void start() {
        System.out.println("Machine " + this.name + " started working.");

        if(this.thread == null) {
            this.thread = new Thread (this, this.name);
            this.thread.start(); //this calls run() in a new Thread
        }
    }

    public void run() {
        this.startSensors();
        this.checkSensorsForNewDataForeverAndPublish();
    }

    private void startSensors() {
        for (Sensor sensor: this.sensors) {
            sensor.start();
        }
    }

    private void checkSensorsForNewDataForeverAndPublish() {
        while(true) {
            for (Sensor sensor: this.sensors) {
                if(sensor.hasNewData()) {
                    JSONObject data = sensor.readData();
                    if(sensor.getClass() == QRCodeSensor.class)
                        this.publishMessage(this.productTopic, data.toString().getBytes());
                    else
                        this.publishMessage(this.machineTopic, data.toString().getBytes());
                }
            }
        }
    }

    // private byte[] getConfigContent() throws IOException{
    //     String file_name = "machine1_TEMPORARY.json"; //TODO: CHANGE THIS
    //     File file = new File(file_name);     
    //     byte[] bytes = Files.readAllBytes(file.toPath());
    //     return bytes;
    // }

    private ArrayList<Sensor> getSensors() {
        return this.sensors;
    }

    public void setSensors(ArrayList<Sensor> sensors){
        this.sensors = sensors;
    }

    @Override
    public void disconnected(MqttDisconnectResponse mqttDisconnectResponse) {
        // System.out.println("--");
        // System.out.println("disconnected()");
        // System.out.println("disconnect response: " + mqttDisconnectResponse.toString());
        // System.out.println("--");

        //TODO: handle disconnection
    }

    @Override
    public void mqttErrorOccurred(MqttException e) {
        // System.out.println("--");
        // System.out.println("mqttErrorOccurred()");
        // System.out.println("exception: " + e.toString());
        // System.out.println("--");

        //TODO: handle error
    }

    @Override
    public void messageArrived(String s, MqttMessage mqttMessage){
        // System.out.println("--");
        // System.out.println("messageArrived()");
        // System.out.println("topic: " + s);
        // System.out.println("message: " + mqttMessage.toString());
        // System.out.println("--");

        //TODO: handle message
    }

    @Override
    public void deliveryComplete(IMqttToken iMqttToken) {
        // System.out.println("--");
        // System.out.println("deliveryComplete()");
        // System.out.println("token: " + iMqttToken.toString());
        // System.out.println("--");

        //TODO: handle delivery complete
    }

    @Override
    public void connectComplete(boolean b, String s) {
        // System.out.println("--");
        // System.out.println("connectComplete()");
        // System.out.println("reconnect: " + b);
        // System.out.println("serverURI: " + s);
        // System.out.println("--");

        //TODO: handle connection complete
    }

    @Override
    public void authPacketArrived(int i, MqttProperties mqttProperties) {
        // System.out.println("--");
        // System.out.println("authPacketArrived()");
        // System.out.println("reason code: " + i);
        // System.out.println("properties: " + mqttProperties.toString());
        // System.out.println("--");

        //TODO: handle auth packet arrived
    }


}
