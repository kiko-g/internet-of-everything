package ds.listener;
import java.util.UUID;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MachineListener {
    private final String brokerURI;
    private final String subscriberId;
    private MqttClient subscriber;
    private String[] topics;

    public MachineListener(String[] topics) {
        this.brokerURI = "tcp://mosquitto:1883";
        this.subscriberId = UUID.randomUUID().toString();
        this.topics = topics;
    }

    public void init() {
        try {
            System.out.println("Connecting to MQTT Broker at " + this.brokerURI);

            // Connect to Broker
            this.subscriber = new MqttClient(this.brokerURI, subscriberId);
            this.subscriber.setCallback(new SubscribeCallback());
            this.subscriber.connect();

            System.out.println("Connected with success to MQTT Broker at " + this.brokerURI);


            //Subscribe to all machine sensors
            for (String topic: topics) {
                System.out.println("Subscribed to " + topic);
                this.subscriber.subscribe(topic);
            }

        } catch (MqttException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static void main(String[] args) {

        if(args.length == 0){
            System.err.println("Usage: java MachineListener [sensors...]");
            System.out.println("e.g. java MachineListener temperature");
        }

        MachineListener machineListener = new MachineListener(args);
        machineListener.init();
    }
}  
