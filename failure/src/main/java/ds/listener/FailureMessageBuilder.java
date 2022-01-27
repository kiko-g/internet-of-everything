package ds.listener;

import ds.Utils;
import ds.failures.FailureAction;
import ds.failures.FailureSeverity;
import ds.failures.FailureType;
import ds.state.MachineState;
import ds.state.State;
import org.json.JSONException;
import org.json.JSONObject;


public class FailureMessageBuilder {
    private final JSONObject messageParsed;
    private final JSONObject failureMessage;
    private final State state;

    public FailureMessageBuilder(JSONObject messageParsed, State state){
        this.messageParsed = messageParsed;
        this.failureMessage = new JSONObject();
        this.state = state;
        this.buildMessage();
    }

    private void buildMessage() {
        setMachineID();
        setSensorID();
        setReadingTime();
        failureMessage.put("failureSeverity", FailureSeverity.LOW);
    }

    public JSONObject getFailureMessage(){
        return this.failureMessage;
    }

    public boolean containsError(){
        return this.failureMessage.has("action");
    }

    private void setMachineID(){
        try {
            String machineID = this.messageParsed.getString("machineID");
            this.failureMessage.put("machineID", machineID);
            if (!this.state.findMachine(machineID)){
                this.setDescription("Unknown machineID");
                this.setFailureType(FailureType.UNKNOWN);
                this.setAction(FailureAction.WARNING);
            }
        } catch(JSONException e){
            this.failureMessage.put("machineID", "null");
            this.setDescription("Invalid machineID format");
            this.setFailureType(FailureType.FORMAT);
            this.setAction(FailureAction.WARNING);
        }

    }

    private void setSensorID(){
        try {

            String sensorID = this.messageParsed.getString("sensorID");
            this.failureMessage.put("sensorID", sensorID);
            // Check if contains
            if (!existSensorID(sensorID)){
                this.failureMessage.put("sensorID", "null");
                this.setFailureType(FailureType.UNKNOWN);
                this.setAction(FailureAction.WARNING);
                this.setDescription("sensorID does not exist");
            }
        } catch(JSONException e){
            this.failureMessage.put("sensorID", "null");
            this.setDescription("Invalid format for sensorID");
            this.setFailureType(FailureType.FORMAT);
            this.setAction(FailureAction.WARNING);
        }
    }

    /**
     * Verifies if sensorID exists.
     */
    private boolean existSensorID(String sensorID){
        // Comparation doesn't make sense if machineID is wrong.
        if (this.containsError()) return true;
        MachineState machineState = this.state.getMachineState(this.failureMessage.getString("machineID"));
        return machineState.findSensor(sensorID);
    }

    private void setReadingTime(){
        try{
            String readingTime = this.messageParsed.getString("readingTime");
            Utils.parseDateTime(readingTime);
            this.failureMessage.put("readingTime", readingTime);
        } catch(Exception e){
            this.failureMessage.put("readingTime", "null");
            this.setDescription("Invalid readingTime");
            this.setFailureType(FailureType.FORMAT);
            this.setAction(FailureAction.WARNING);
        }
    }

    public void setGenericError(String description, FailureType failureType, FailureAction action){
        setDescription(description);
        setFailureType(failureType);
        setAction(action);
    }

    private void setDescription(String description){
        this.failureMessage.put("description", description);
    }

    private void setFailureType(FailureType failureType){
        this.failureMessage.put("failureType", failureType);
    }

    private void setAction(FailureAction action){
        this.failureMessage.put("action", action);
    }


}
