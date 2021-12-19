package ds.listener;
import ds.state.MachineState;
import ds.state.State; 

import java.util.UUID;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class MachineListener implements MqttCallbackExtended {
    private final String brokerURI;
    private final String subscriberId;

    private State state = new State();  // Stores the current state of all machines.
    // The state will store the last INFO_SIZE data for each attribute, e.g, will be stored the last INFO_SIZE
    // temperatures for each machine.
    public static final Integer INFO_SIZE = 3;


    public MachineListener() {
        this.brokerURI = "tcp://mosquitto:1883";
        this.subscriberId = UUID.randomUUID().toString();
    }

    public void init() {
        try {
            System.out.println("Connecting to MQTT Broker at " + this.brokerURI);

            // Connect to Broker
            MqttClient subscriber = new MqttClient(this.brokerURI, subscriberId);
            subscriber.setCallback(this);
            subscriber.connect();
            System.out.println("Connected with success to MQTT Broker at " + this.brokerURI);

            //Subscribe to all machine sensors
            subscriber.subscribe("production/machine");
            System.out.println("Subscribed to machine/*");

        } catch (MqttException e) {
            e.printStackTrace();
            System.out.println("Failed connecting to MQTT Broker");
            System.exit(1);
        }

    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java MachineListener");
            System.out.println("e.g. java MachineListener");
        }

        MachineListener machineListener = new MachineListener();
        machineListener.init();
        
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        System.out.println(messageParsed);
        String machineID = messageParsed.getString("machineID");
        System.out.println(machineID);

        try {
            if (!this.state.findMachine(machineID)) {
                this.addMachineToState(messageParsed);
            } else {
                this.updateState(messageParsed);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
    }

     /**
     * Creates a new machine state with the current ID and adds to the system state.
     * @param messageParsed JSONObject with the message content.
     */
    public void addMachineToState(JSONObject messageParsed){
        MachineState machineState = new MachineState(messageParsed);
        this.state.addMachine(machineState.getId(), machineState);
        System.out.println("MachineID :: " + machineState.getId()+ "::" + machineState.getTempState().getMeanTemp());
    }

    /**
     * Updates a machine state.
     * @param messageParsed JSONObject with the message content.
     */
    public void updateState(JSONObject messageParsed){
        String machineID = messageParsed.get("machineID").toString();
        MachineState machineState = this.state.getMachineState(machineID);

        machineState.addTemperature(messageParsed.getJSONObject("properties").getFloat("temperature"));
        // Replaces the old state to the new one.
        this.state.addMachine(machineID, machineState);
        System.out.println("MachineID :: " + machineID + "::" + machineState.getTempState().getMeanTemp());
    }

    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {}

    @Override
    public void connectComplete(boolean reconnect, String serverURI) {}

    @Override
    public void connectionLost(Throwable cause) {}

}
