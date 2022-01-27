import Sensors.*;
import org.eclipse.paho.mqttv5.client.IMqttToken;
import org.eclipse.paho.mqttv5.client.MqttDisconnectResponse;
import org.eclipse.paho.mqttv5.common.MqttException;
import org.eclipse.paho.mqttv5.common.MqttMessage;
import org.eclipse.paho.mqttv5.common.packet.MqttProperties;
import org.json.JSONObject;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import java.util.*;

public class Machine extends MQTTClient implements Runnable {
    public static final double FAILURE_RATE = 0.05;

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
    Queue<Material> items = new LinkedList<>();
    private ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(1);
    private Material materialInProduction;
    private QRCodeSensor inSensor;
    private QRCodeSensor outSensor;


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
        this.materialInProduction = null;
        this.publishMessage("startup", config);
        this.subscribeTopic("failure/" + id);
    }

    private QRCodeSensor getQRSensors(QRCodeSensor.Action action){
        for(Sensor sensor: this.sensors){
            if(sensor.getClass() == QRCodeSensor.class) {
                if(((QRCodeSensor) sensor).getAction() == action)
                    return (QRCodeSensor) sensor;
            }
        }
        return null;
    }

    public void setSensors(ArrayList<Sensor> sensors){
        this.sensors = sensors;

        this.inSensor = this.getQRSensors(QRCodeSensor.Action.IN);
        this.outSensor = this.getQRSensors(QRCodeSensor.Action.OUT);
    }

    private ArrayList<Sensor> getSensors() {
        return this.sensors;
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

    private void setOutMaterial(Material material){
        this.outSensor.setMaterial(material.materialID,material.defect);
    }

    private void setInMaterial(Material material){
        this.inSensor.setMaterial(material.materialID,material.defect);
    }

    private boolean isStartMachine(){
        return this.prevMachineID.equals("null");
    }

    private boolean isEndMachine(){
        return this.nextMachineID.equals("null");
    }

    private String getRandomId(){
        int id;
        do{
            id = (int)(Math.random()*1000);
        } while (this.idSet.contains(String.valueOf(id)));
        
        return String.valueOf(id);
    }

    private void queueNewMaterial(){
        String id = this.getRandomId();
        idSet.add(id);
        Material material = new Material(id, false);
        items.add(material);
    }

    private void startProducingMaterial() {
        // Get item from queue 
        Material item = this.items.poll();
        if(item != null){
            // Set new product in production
            this.materialInProduction = item;
            this.setInMaterial(item);
            JSONObject data = inSensor.readData();
        
            this.publishMessage(this.productTopic, data.toString().getBytes());
        }
    }

    private void dispatchMaterial(){
        // Set defect
        if(Math.random() < FAILURE_RATE)
            this.materialInProduction.defect = true;
        
        // Finish production of current product
        this.setOutMaterial(this.materialInProduction);
        JSONObject data = outSensor.readData();

        this.publishMessage(this.productTopic, data.toString().getBytes());

        if(!this.isEndMachine())
            this.publishMessage(this.nextMachineID, this.materialInProduction.toString().getBytes());
        this.materialInProduction = null;
    }

    private void checkSensorsForNewDataForeverAndPublish() {
        long last_time = System.currentTimeMillis();
        
        // Simulate incoming products in the start machine
        if(this.isStartMachine())
            this.executor.scheduleWithFixedDelay(new Thread(() -> this.queueNewMaterial()), 2000, 3000, TimeUnit.MILLISECONDS);

        while(true) {
            long curr_time = System.currentTimeMillis();

            if((curr_time - last_time) > this.timePerBatch){
                last_time = curr_time;
                
                // Dispatch item if there is one being produced
                if(this.materialInProduction != null)
                    this.dispatchMaterial();
                // Start producing new item if there is one available
                else 
                    this.startProducingMaterial();     
            }

            for (Sensor sensor: this.sensors) {
                if(sensor.hasNewData() && sensor.getClass() != QRCodeSensor.class) {
                    JSONObject data = sensor.readData();
                    this.publishMessage(this.machineTopic, data.toString().getBytes());
                }
            }
        }
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
        //System.out.println("message: " + mqttMessage.toString());
        // System.out.println("--");

        if(s.equals(this.name)){
            Material material = new Material(mqttMessage.toString());
    
            if(!material.defect)
                items.add(material);
            else
                System.out.println("Item received with defect, id:" + material.materialID);
        }
        else if(s.equals("failure/" + this.name)){
            parseErrors(mqttMessage.toString());
        }

    }

    public void parseErrors(String message){
        String[] arrOfStr = message.split(",");

        String action_str = arrOfStr[4];

        String[] arrOfStr2 = action_str.split(":");

        String action = arrOfStr2[1].replace("\"", "");

        switch(action){
            case "WARNING":
                System.out.println(this.name + " Warning\n");
                break;
            case "POWEROFF":
                handlePowerOff();
                break;
            case "INCREASE_FANS":
                handleFanSpeed("INCREASE_FANS");
                break;
            case "DECREASE_FANS":
                handleFanSpeed("DECREASE_FANS");
                break;
            case "INCREASE_GEAR_SPEED":
                handleGearSpeed("INCREASE_GEAR_SPEED");
                break;
            case "DECREASE_GEAR_SPEED":
                handleGearSpeed("DECREASE_GEAR_SPEED");
                break;
        }

    }

    //These functions can be used for future implementation of real error handling

    public void handlePowerOff(){
        System.out.println(this.name + " is powering off\n");
    }

    public void handleFanSpeed(String fan_action){
        if(fan_action.equals("INCREASE_FANS")){
            System.out.println(this.name + " is increasing fan speed\n");
        }
        else if(fan_action.equals("DECREASE_FANS")){
            System.out.println(this.name + " is decreasing fan speed\n");
        }
    }

    public void handleGearSpeed(String gear_action){
        if(gear_action.equals("INCREASE_GEAR_SPEED")){
            System.out.println(this.name + " is increasing gear speed\n");
        }
        else if(gear_action.equals("DECREASE_GEAR_SPEED")){
            System.out.println(this.name + " is decreasing gear speed\n");
        }
    }

    @Override
    public void deliveryComplete(IMqttToken iMqttToken) {
        // System.out.println("--");
        // System.out.println("deliveryComplete()");
        // System.out.println("token: " + iMqttToken.toString());
        // System.out.println("--");
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
