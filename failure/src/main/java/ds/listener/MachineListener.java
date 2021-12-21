package ds.listener;
import ds.state.MachineState;
import ds.state.State; 
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class MachineListener extends Listener {
    private State state; // Stores the current state of all machines.
    // The state will store the last INFO_SIZE data for each attribute, e.g, will be stored the last INFO_SIZE
    // temperatures for each machine.
    public static final Integer INFO_SIZE = 3;


    public MachineListener() {
        super("production/machine");
        this.state = new State(); 
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        System.out.println(messageParsed);
        String machineID = messageParsed.getString("machineID");

        try {
            if (!this.state.findMachine(machineID)) {
                this.addMachineToState(messageParsed);
            } else {
                this.updateState(messageParsed);
            }
        } catch(Exception e){
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

}
