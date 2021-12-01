import java.util.Arrays;
import java.util.UUID;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public abstract class MachineSensor implements MqttCallback {
    private final String serverURI;
    private MqttClient client;
    private final String topic;

    public MachineSensor(String topic){
        this.serverURI = "tcp://broker.mqttdashboard.com:1883";
        this.topic = topic;
        this.init();
    }

    private void init(){
        try {
            System.out.println("Connecting to MQTT Broker at " + this.serverURI);

            String publisherId = UUID.randomUUID().toString();
            this.client = new MqttClient(this.serverURI, publisherId);
            this.client.setCallback(this);
            this.client.connect(this.getMQTTOptions());

        } catch (MqttException e) {
            System.out.println("Error connecting to MQTT Broker at " + serverURI + " - " + e);
        }
    }

    private MqttConnectOptions getMQTTOptions(){
        MqttConnectOptions mqttOptions = new MqttConnectOptions();
        mqttOptions.setCleanSession(true);
        mqttOptions.setAutomaticReconnect(true);
        mqttOptions.setCleanSession(true);
        mqttOptions.setConnectionTimeout(20);

        return mqttOptions;
    }
      
    public void subscribe(int qos, IMqttMessageListener listenerMQTT, String[] topics) {
        if (this.client == null || topics.length == 0)
            return;

        int nTopics = topics.length;
        int[] qoss = new int[nTopics];
        IMqttMessageListener[] listeners = new IMqttMessageListener[nTopics];

        for (int i = 0; i < nTopics; i++) {
            qoss[i] = qos;
            listeners[i] = listenerMQTT;
        }

        try {   
            this.client.subscribe(topics, qoss, listeners);
        } catch (MqttException e) {
            System.out.println(String.format("Error while subscribing to topics %s - %s", Arrays.asList(topics), e));
        }
    }

    public void publish(){
        try {
            if (this.client.isConnected()) {
                MqttMessage msg = readSensor();
                msg.setQos(2);
                this.client.publish(this.topic, msg);
                System.out.println(String.format("Published to %s. %s", this.topic, msg.toString()));

            } else {
                System.out.println(String.format("Client id disconnected. Error publishing to %s", this.topic));
            }

        } catch (MqttException e) {
            System.out.println("Error publishing to " + this.topic + " - " + e);
        }
    }
    
    abstract protected MqttMessage readSensor();
    
    @Override
    public void connectionLost(Throwable thrwbl) {
        System.out.println("The connection with the Broker was lost -" + thrwbl);
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken imdt) {
    }

    @Override
    public void messageArrived(String topic, MqttMessage mm) throws Exception {
    }
}
