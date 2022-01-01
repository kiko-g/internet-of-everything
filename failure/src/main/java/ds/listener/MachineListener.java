package ds.listener;
import ds.failures.TemperatureFailure;
import ds.graph.Graph;
import ds.state.MachineState;
import ds.state.State; 
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class MachineListener extends Listener {
    private State state; // Stores the current state of all machines.
    public static final Integer INFO_SIZE = 3; // Number of previous states to save
    private TemperatureFailure temperatureFailure;

    public MachineListener(Graph graph) {
        super("production/machine", graph);
        this.state = new State(graph); 
        this.temperatureFailure = new TemperatureFailure();
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        //System.out.println(messageParsed);

        try {
            this.updateState(messageParsed);
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    /**
     * Updates a machine state.
     * @param messageParsed JSONObject with the message content.
     */
    public void updateState(JSONObject messageParsed){
        String machineID = messageParsed.get("machineID").toString();
        MachineState machineState = this.state.getMachineState(machineID);

        // TODO: update machine state/sensor state
        // machineState.addTemperature(messageParsed.getJSONObject("values").getFloat("temperature"));

        // Replaces the old state with the new one.
        this.state.updateMachine(machineID, machineState);
        System.out.println(machineState);

        /*       
        System.out.println("MachineID :: " + machineID + 
        "\n\t:: mean temperature :: " + machineState.getTempState().getMeanTemp() + 
        "\n\t:: last temperature :: " + machineState.getTempState().getCurrentTemp());
        */

        // TODO: check values of the sensor against the expected values - FAILURE ANALYSIS
        //this.temperatureFailure.checkMachine(machineState);
    }
}
