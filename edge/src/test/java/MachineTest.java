import org.eclipse.paho.mqttv5.client.IMqttToken;
import org.eclipse.paho.mqttv5.client.MqttDisconnectResponse;
import org.eclipse.paho.mqttv5.common.MqttException;
import org.eclipse.paho.mqttv5.common.MqttMessage;
import org.eclipse.paho.mqttv5.common.packet.MqttProperties;
import org.junit.Test;
import static org.mockito.Mockito.*;

public class MachineTest {
    Machine machine = new Machine("machine1");

    @Test
    public void testDisconnected(){
        MqttDisconnectResponse disconnectResponse = mock(MqttDisconnectResponse.class);

        machine.disconnected(disconnectResponse);

        // TODO: after handle DISCONNECTED
        //       check if everything is as supposed to be
    }

    @Test
    public void testMQTTErrorOccurred(){
        MqttException exception = mock(MqttException.class);

        machine.mqttErrorOccurred(exception);

        // TODO: after handle MQTT ERROR OCCURRED
        //       check if everything is as supposed to be
    }

    @Test
    public void testMessageArrived(){
        String topic = ""; //change this line
        MqttMessage message = mock(MqttMessage.class);

        machine.messageArrived(topic, message);

        // TODO: after handle MESSAGE ARRIVED
        //       check if everything is as supposed to be
    }

    @Test
    public void testDeliveryComplete(){
        IMqttToken token = mock(IMqttToken.class);

        machine.deliveryComplete(token);

        // TODO: after handle DELIVERY COMPLETED
        //       check if everything is as supposed to be
    }

    @Test
    public void testConnectComplete(){
        boolean reconnect = false; // change if needed
        String serverURI = "tcp://localhost:1883"; //change if needed

        machine.connectComplete(reconnect, serverURI);

        // TODO: after handle CONNECT COMPLETE
        //       check if everything is as supposed to be
    }

    @Test
    public void testAuthPacketArrived(){
        int reasonCode = 1;
        MqttProperties properties = mock(MqttProperties.class);

        machine.authPacketArrived(reasonCode, properties);

        // TODO: after handle AUTH PACKET ARRIVED
        //       check if everything is as supposed to be
    }

}
