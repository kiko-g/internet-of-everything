import org.eclipse.paho.mqttv5.client.*;
import org.eclipse.paho.mqttv5.client.persist.MemoryPersistence;
import org.eclipse.paho.mqttv5.common.MqttException;
import org.eclipse.paho.mqttv5.common.MqttMessage;

// example: https://partners-intl.aliyun.com/help/doc-detail/146631.htm

public abstract class MQTTClient implements MqttCallback {
    // ------ Client Configuration ------ //
    String willTopic = "will";
    String willContent = "I've Disconnected, sorry!";
    int qos = 2; // exactly once delivery
    String broker = "tcp://localhost:1883";
    String clientId;
    private MqttClient client;
    private boolean publishing = true;


    MQTTClient(String clientId){
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

            System.out.println("Connecting " + clientId + " to broker: " + broker);

            client.connect(conOpts);

        } catch (MqttException e) {
            System.err.println("Exception Occurred whilst connecting the client " + clientId + ": ");
            e.printStackTrace();
        }
    }

    protected void finalize()
    {
        try {
            this.client.disconnect(5000);
            System.out.println("Disconnected");
            this.client.close();
        } catch (MqttException e) {
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
            client.publish(topic, message);
        } catch (MqttException e) {
            System.err.println("Exception Occured whilst publishing the message: " + e.getMessage());
        }
    }

    public void subscribeTopic(String topic) {
        try {
            client.subscribe(topic, qos);
        } catch (MqttException e) {
            System.err.println("Exception Occured whilst publishing the message: " + e.getMessage());
        }
    }
}
