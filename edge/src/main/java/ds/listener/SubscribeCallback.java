package ds.listener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class SubscribeCallback implements MqttCallback {

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        // TODO: receive message according to the defined format
        System.out.println("Message received:");
        System.out.println("\tTopic: " + topic);
        System.out.println("\tMessage: " + new String(message.getPayload()));
        System.out.println("");
    }

    @Override
    public void connectionLost(Throwable cause) {}

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {}
}