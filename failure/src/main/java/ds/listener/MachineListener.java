package ds.listener;
import ds.graph.Graph;
import ds.state.sensor.SensorState;
import ds.state.State; 

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class MachineListener extends Listener {
    private State state; // Stores the current state of all machines.
    // TODO improve this description.
    public static final Integer INFO_SIZE = 3; // Number of previous states to save

    public MachineListener(Graph graph) {
        super("production/machine", graph);
        this.state = new State(graph); 
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));

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
        // TODO production speed should be a sensor? 
        String machineID = messageParsed.get("machineID").toString(); 
        String sensorID = messageParsed.get("sensorID").toString();
        JSONObject measureValues  = (JSONObject) messageParsed.get("values"); 

        SensorState sensorState = this.state.getMachineState(machineID).getSensorState(sensorID);

        measureValues.keySet().forEach((key) -> {
            float measureValue = measureValues.getFloat(key);
            sensorState.updateMeasureState(key, measureValue);
        });
        System.out.println(this.state.getMachineState(machineID));
        // TODO: check values of the sensor against the expected values - FAILURE ANALYSIS
        //this.temperatureFailure.checkMachine(machineState);
    }

}
