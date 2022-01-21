package ds.listener;

import java.util.UUID;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import ds.graph.Graph;
import io.github.cdimascio.dotenv.Dotenv;


public class Listener implements MqttCallbackExtended {
    private final String brokerURI;
    private final String subscriberId;
    private String topic;
    protected Graph machinesGraph;

    public Listener(String topic, Graph graph) {
        Dotenv dotenv = Dotenv.load();
        this.brokerURI = "tcp://" + dotenv.get("mosquitto_address") + ":1883";
        this.subscriberId = UUID.randomUUID().toString();
        this.topic = topic;
        this.machinesGraph = graph;
    }

    public void init() {
        try {
            System.out.println("Connecting to MQTT Broker at " + this.brokerURI);

            // Connect to Broker
            MqttClient subscriber = new MqttClient(this.brokerURI, subscriberId);
            subscriber.setCallback(this);
            subscriber.connect();
            System.out.println("Connected with success to MQTT Broker at " + this.brokerURI);

            //Subscribe to sensors
            subscriber.subscribe(topic);
            System.out.println("Subscribed to " + this.topic);

        } catch (MqttException e) {
            e.printStackTrace();
            System.out.println("Failed connecting to MQTT Broker");
            System.exit(1);
        }
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        System.out.println(messageParsed);
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {}

    @Override
    public void connectComplete(boolean reconnect, String serverURI) {}

    @Override
    public void connectionLost(Throwable cause) {}

}

