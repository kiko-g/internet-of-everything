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

import java.util.*;

public class Machine extends MQTTClient implements Runnable {
    Thread thread;
    String name;

    Long status;
    Long defectProbability;
    String input;
    String output;
    Long timePerBatch;
    String prevMachineID;
    String nextMachineID;
    String machineTopic;
    String productTopic;
    ArrayList<Sensor> sensors; // maybe change to hashmap with sensor's names
    Set<String> idSet = new HashSet<>();
    Queue<String> items = new LinkedList<>();

    Machine(String id, Long machineStatus, Long defectProb, String machineInput, String machineOutput, Long timeBatch, String prevMachineID, String nextMachine, byte[] config) {
        super(id);
        this.name = id;
        this.status = machineStatus;
        this.defectProbability = defectProb;
        this.input = machineInput;
        this.output = machineOutput;
        this.timePerBatch = timeBatch;
        this.prevMachineID = prevMachineID;
        this.nextMachineID = nextMachine;
        this.machineTopic = "machine/" + id;
        this.productTopic = "product/" + id;
        this.publishMessage("startup", config);
    }


    public void start() {
        System.out.println("Machine " + this.name + " started working.");
        if(this.prevMachineID != null)
            this.subscribeTopic(this.name);
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

    private String randomID(){
        int idSize = 5;
        String possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder id = new StringBuilder();
        for(int i = 0; i < idSize; i++) {
            int index = (int) (Math.random() * possibleChars.length());
            id.append(possibleChars.charAt(index));
        }
        return id.toString();
    }

    private void receiveNewMaterial(){
        if(prevMachineID == null){
            String id;
            do{
                id = randomID();
            }while (idSet.contains(id));
            idSet.add(id);
            items.add(id);
            System.out.println(this.name+"::::Product "+id+" entered production line");
        }
    }

    private void dispatchMaterial(){
        String item = items.poll();
        System.out.println(this.name+"::::Product "+item+" dispatched");
        if (nextMachineID != null && item != null){
             this.publishMessage(this.nextMachineID, item.getBytes());
        }
    }

    private void checkSensorsForNewDataForeverAndPublish() {
        long last_time = System.currentTimeMillis();
        receiveNewMaterial();
        while(true) {
            long curr_time = System.currentTimeMillis();

            if((curr_time - last_time) > this.timePerBatch){
                last_time = curr_time;
                receiveNewMaterial();
                dispatchMaterial();
            }

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
        System.out.println("--");
        System.out.println("disconnected()");
        System.out.println("disconnect response: " + mqttDisconnectResponse.toString());
        System.out.println("--");

        //TODO: handle disconnection
    }

    @Override
    public void mqttErrorOccurred(MqttException e) {
        System.out.println("--");
        System.out.println("mqttErrorOccurred()");
        System.out.println("exception: " + e.toString());
        System.out.println("--");

        //TODO: handle error
    }

    @Override
    public void messageArrived(String s, MqttMessage mqttMessage){
        System.out.println("--");
        System.out.println("messageArrived()");
        System.out.println("topic: " + s);
        System.out.println("message: " + mqttMessage.toString());
        System.out.println("--");

        if(s.equals(this.name)){
            System.out.println(this.name+"::::Received "+mqttMessage+" from "+this.prevMachineID);
            this.items.add(mqttMessage.toString());
        }

        //TODO: handle message
    }

    @Override
    public void deliveryComplete(IMqttToken iMqttToken) {
        System.out.println("--");
        System.out.println("deliveryComplete()");
        System.out.println("token: " + iMqttToken.toString());
        System.out.println("--");

        //TODO: handle delivery complete
    }

    @Override
    public void connectComplete(boolean b, String s) {
        System.out.println("--");
        System.out.println("connectComplete()");
        System.out.println("reconnect: " + b);
        System.out.println("serverURI: " + s);
        System.out.println("--");

        //TODO: handle connection complete
    }

    @Override
    public void authPacketArrived(int i, MqttProperties mqttProperties) {
        System.out.println("--");
        System.out.println("authPacketArrived()");
        System.out.println("reason code: " + i);
        System.out.println("properties: " + mqttProperties.toString());
        System.out.println("--");

        //TODO: handle auth packet arrived
    }


}
