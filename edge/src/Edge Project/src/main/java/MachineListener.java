
import java.util.UUID;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MachineListener {
    private final String brokerURI;
    private final String subscriberId;
    private MqttClient subscriber;
    private String topic;

    public MachineListener(String topic) {
        this.brokerURI = "tcp://localhost:1883";
        this.subscriberId = UUID.randomUUID().toString();
        this.topic = topic;

        this.init();
    }

    public void init() {
        try {
            System.out.println("Connecting to MQTT Broker at " + this.brokerURI);

            // Connect to Broker
            this.subscriber = new MqttClient(this.brokerURI, subscriberId);
            this.subscriber.setCallback(new SubscribeCallback());
            this.subscriber.connect();

            //Subscribe to all subtopics of homeautomation
            this.subscriber.subscribe(topic);

        } catch (MqttException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

}  
