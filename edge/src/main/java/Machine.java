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
    String publishTopic;
    ArrayList<Sensor> sensors; // maybe change to hashmap with sensor's names

    Machine(String id) {
        super(id);
        this.name = id;
        this.subscribeTopic("testTopic");
        this.publishMessage("testTopic", ("Hello world from " + id).getBytes());
        this.publishTopic = "edge/" + id;

        try {
            byte[] config = this.getConfigContent();
            this.publishMessage("startup", config);
        } catch (IOException e) {
            System.err.println("Machine Configuration Not Found.");
            System.exit(-1);
        }

        this.sensors = getSensors(); // only to get some sensors while there are no configuration files
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
        this.checkSensorsForNewDataForever();
    }

    private void startSensors() {
        for (Sensor sensor: this.sensors) {
            sensor.start();
        }
    }

    private void checkSensorsForNewDataForever() {
        while(true) {
            for (Sensor sensor: this.sensors) {
                if(sensor.hasNewData()) {
                    JSONObject data = sensor.readData();
                    this.publishMessage(this.publishTopic, data.toString().getBytes());
                }
            }
        }
    }

    private byte[] getConfigContent() throws IOException{
        String file_name = "machine1_TEMPORARY.json"; //TODO: CHANGE THIS
        File file = new File(file_name);     
        byte[] bytes = Files.readAllBytes(file.toPath());
        return bytes;
    }

    private ArrayList<Sensor> getSensors() {
        // only to get some sensors while there are no configuration files

        sensors = new ArrayList<>();
        sensors.add(new PositionSensor("pos1", this.name, 1, 1, 1000));
        sensors.add(new ProductionSpeedSensor("prodSpeed1", this.name, 1, 1, 3000));
        sensors.add(new TemperatureSensor("temp1", this.name, 1, 1, 4000));
        sensors.add(new VibrationSensor("vib1", this.name, 1, 1, 2000));
        return sensors;
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
