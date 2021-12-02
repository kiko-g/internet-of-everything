package ds.publisher;
import java.util.UUID;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttTopic;


public abstract class MachineSensor {
    private final String brokerURI;
    private final String publisherId;
    private MqttClient publisher;
    private final String topic;

    public MachineSensor(String topic){
        this.brokerURI = "tcp://localhost:1883";
        this.publisherId = UUID.randomUUID().toString();
        this.topic = topic;
    }

    protected void init(){
        try {
            System.out.println("Connecting to MQTT Broker at " + this.brokerURI);

            // Connect to Broker
            this.publisher = new MqttClient(this.brokerURI, publisherId);
            this.publisher.connect(this.getMQTTOptions());

            // Start Publishing
            ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(10);
            executor.scheduleWithFixedDelay(new Thread(() -> this.publish()), 0, 1500, TimeUnit.MILLISECONDS);
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

    public void publish(){
        
        try {
            final MqttTopic temperatureTopic = this.publisher.getTopic(this.topic);

            MqttMessage msg = readSensor();
            msg.setQos(2);

            temperatureTopic.publish(msg);

            System.out.println(String.format("Published to %s. %s", this.topic, msg.toString()));

        } catch (MqttException e) {
            System.err.println("Error publishing to " + this.topic + " - " + e);
        }
    }
    
    abstract protected MqttMessage readSensor();

}
