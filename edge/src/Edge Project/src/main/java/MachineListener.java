
import org.eclipse.paho.client.mqttv3.IMqttMessageListener;
    import org.eclipse.paho.client.mqttv3.MqttMessage;

public class MachineListener implements IMqttMessageListener {

    private String[] topics;
    private final int qos;

    public MachineListener(String[] topics, int qos) {
        this.topics = topics;
        this.qos = qos; // Quality of Service - 2 for exactly once delivery
    }

    public void subscribe(MachineSensor sensor){
        sensor.subscribe(this.qos, this, this.topics);
    }

    @Override
    public void messageArrived(String topic, MqttMessage mm) throws Exception {
        System.out.println("Message received:");
        System.out.println("\tTopic: " + topic);
        System.out.println("\tMessage: " + new String(mm.getPayload()));
        System.out.println("");
    }

}  
