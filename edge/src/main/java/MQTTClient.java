import org.eclipse.paho.mqttv5.client.*;
import org.eclipse.paho.mqttv5.client.persist.MemoryPersistence;
import org.eclipse.paho.mqttv5.common.MqttException;
import org.eclipse.paho.mqttv5.common.MqttMessage;
import io.github.cdimascio.dotenv.Dotenv;

// example: https://partners-intl.aliyun.com/help/doc-detail/146631.htm

public abstract class MQTTClient implements MqttCallback {

    private final int qos = 0; // at most once delivery
    private final String broker;
    private String clientId;
    private MqttClient client;
    private final String willTopic = "will";
    private final String willContent = "I've Disconnected, sorry!";


    MQTTClient(String clientId) {
        Dotenv dotenv = Dotenv.load();
        this.broker = "tcp://" + dotenv.get("mosquitto_address") + ":1883";
        try {
            this.clientId = clientId;
            MemoryPersistence persistence = new MemoryPersistence();
            this.client = new MqttClient(broker, clientId, persistence);

            // Lets build our Connection Options:
            MqttConnectionOptionsBuilder conOptsBuilder = new MqttConnectionOptionsBuilder();
            MqttConnectionOptions conOpts = conOptsBuilder.serverURI(broker).cleanStart(true)
                    .sessionExpiryInterval((long) 120).automaticReconnect(true)
                    .will(willTopic, new MqttMessage(willContent.getBytes())).topicAliasMaximum(1000).build();
            client.setCallback(this);

            System.out.println("[MQTT] Connecting " + clientId + " to broker: " + broker);

            client.connect(conOpts);

        } catch (MqttException e) {
            System.err.println("[MQTT] Exception Occurred whilst connecting the client " + clientId + ": ");
            e.printStackTrace();
            System.err.println();
            System.err.println("A possibility is that mosquitto is not running...");
            System.exit(0);
        }
    }

    protected void finalize()
    {
        try {
            this.client.disconnect(5000);
            System.out.println("[MQTT] Disconnected " + this.clientId);
            this.client.close();
        } catch (MqttException e) {
            System.err.println("[MQTT] Exception Occurred whilst finalizing the client " + clientId + ": ");
            e.printStackTrace();
        }
    }

    /**
     * Publish a message with example properties set.
     * @param topic the topic to send the message
     * @param messageContent the message payload to send.
     */
    public void publishMessage(String topic, byte[] messageContent) {
        MqttMessage message = new MqttMessage(messageContent);
        message.setQos(qos);
        try {
            //System.out.println("[MQTT] Publishing message to \"" + topic + "\": " + message);
            client.publish(topic, message);
        } catch (MqttException e) {
            System.err.println("[MQTT] Exception Occured whilst publishing the message: " + e.getMessage());
        }
    }

    public void subscribeTopic(String topic) {
        try {
            System.out.println("[MQTT] Subscribing to \"" + topic + "\"");
            client.subscribe(topic, qos);
        } catch (MqttException e) {
            System.err.println("[MQTT] Exception Occured whilst publishing the message: " + e.getMessage());
        }
    }

    public void unsubscribeTopic(String topic) {
        try {
            System.out.println("[MQTT] Unsubscribing to \"" + topic + "\"");
            client.unsubscribe(topic);
        } catch (MqttException e) {
            System.err.println("[MQTT] Exception Occured whilst publishing the message: " + e.getMessage());
        }
    }
}
