package ds.listener;
import ds.graph.Graph;
import ds.graph.sensor.*;
import ds.state.*; 
import ds.state.sensor.*;
import ds.failures.*;


import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class MachineListener extends Listener {
    private State state; // Stores the current state of all machines.
    public static final Integer INFO_SIZE = 3; // Number of previous states to save
    private FailurePublisher failurePublisher; 

    public MachineListener(Graph graph) {
        super("production/machine", graph);
        this.state = new State(graph); 
        // TODO: perhaps in the future implement send to the machine topic.
        this.failurePublisher = new FailurePublisher("failure");
        this.failurePublisher.init();
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
        String machineID = messageParsed.get("machineID").toString(); 
        String sensorID = messageParsed.get("sensorID").toString();
        SensorState sensorState = this.state.getMachineState(machineID).getSensorState(sensorID);
        JSONObject measureValues  = messageParsed.getJSONObject("values"); 

        measureValues.keySet().forEach((key) -> {
            float measureValue = measureValues.getFloat(key);
            boolean isMeasureAllowed = sensorState.updateMeasureState(key, measureValue);
            if (!isMeasureAllowed) sendFailure(messageParsed, sensorState, key);
        });
    }


    public void sendFailure(JSONObject messageParsed, SensorState sensorState, String measureType){  
        String machineID = messageParsed.get("machineID").toString(); 
        String readingTime = messageParsed.get("readingTime").toString();
        float measureValue = messageParsed.getJSONObject("values").getFloat(measureType);
        Failure failure = new Failure(sensorState, machineID, readingTime); 
        Values expectedValues = sensorState.getMeasureState(measureType).getExpectedValues();

        //TODO: change severity according to what the clients considers high priority.
        if (measureValue > expectedValues.getMax()) {
            failure.setFailureType(FailureType.ABOVE_EXPECTED);
            failure.setFailureSeverity(FailureSeverity.HIGH);
            failure.setDescription("Detected value: " + measureValue);
        }
        else if (measureValue < expectedValues.getMin()) {
            failure.setFailureType(FailureType.UNDER_EXPECTED);
            failure.setFailureSeverity(FailureSeverity.HIGH);
            failure.setDescription("Detected value: " + measureValue);
        }

        System.out.println(failure.getMessage());
        this.failurePublisher.publish(failure.getMessage());
    }

}
