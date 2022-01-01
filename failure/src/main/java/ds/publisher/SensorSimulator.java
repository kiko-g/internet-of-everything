package ds.publisher;
import java.util.UUID;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttTopic;


public abstract class SensorSimulator {
    private final String brokerURI;
    private final String publisherId;
    private MqttClient publisher;
    private final String topic;

    public SensorSimulator(String topic){
        this.brokerURI = "tcp://mosquitto:1883";
        this.publisherId = UUID.randomUUID().toString();
        this.topic = topic;
    }

    public void init(){
        try {
            System.out.println("Connecting to MQTT Broker at " + this.brokerURI);

            // Connect to Broker
            this.publisher = new MqttClient(this.brokerURI, publisherId);
            this.publisher.connect(this.getMQTTOptions());

        } catch (MqttException e) {
            System.err.println("Error connecting to MQTT Broker at " + brokerURI + " - " + e);
        }
    }

    private MqttConnectOptions getMQTTOptions(){
        MqttConnectOptions mqttOptions = new MqttConnectOptions();
        mqttOptions.setCleanSession(true);
        mqttOptions.setConnectionTimeout(20);
        mqttOptions.setWill(this.publisher.getTopic(this.topic), "Sensor disconnected".getBytes(), 2, false);

        return mqttOptions;
    }

    public void publish(String rawMsg){
        
        try {
            final MqttTopic topicObj = this.publisher.getTopic(this.topic);

            MqttMessage msg = getMqttMessage(rawMsg);
            msg.setQos(2);

            topicObj.publish(msg);

            //System.out.println(String.format("Published to %s. %s", this.topic, msg.toString()));

        } catch (MqttException e) {
            System.err.println("Error publishing to " + this.topic + " - " + e);
        }
    }
    
    private MqttMessage getMqttMessage(String message){
        byte[] payload = message.getBytes();        
        MqttMessage msg = new MqttMessage(payload); 
        msg.setQos(2);
        
        return msg;
    }
}
