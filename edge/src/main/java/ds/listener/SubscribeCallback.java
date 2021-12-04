package ds.listener;
import ds.state.MachineState; 

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser; 

public class SubscribeCallback implements MqttCallback {

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        // TODO: receive message according to the defined format
        System.out.println("Message received:");
        System.out.println("\tTopic: " + topic);
        System.out.println("\tMessage: " + new String(message.getPayload()));
        System.out.println(""); 
        this.parseMessage(message);       
    }

    @Override
    public void connectionLost(Throwable cause) {}

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {} 

    public void parseMessage(MqttMessage mqttMessage) {
        String message = new String(mqttMessage.getPayload());
        JSONParser parser = new JSONParser();
        try {
            JSONObject json = (JSONObject) parser.parse(message); 
            String machineID = json.get("machineID").toString();
            //if (MachineListener.find)


        } catch (Exception e){
            System.out.println("Not possible to retrieve message");
        }

    } 

    /**
     * From the message received, extracts the message id. 
     */
    public void getMachineId(){

    } 

    /**
     * If the machine still is not present in the state, create one. 
     */
    public void createMachineState(){
        return;
    }

    public void updateState(){

    }
}