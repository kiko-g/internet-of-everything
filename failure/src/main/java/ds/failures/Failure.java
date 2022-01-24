package ds.failures;
import ds.state.sensor.*;
import org.json.JSONObject;

/**
 * Class resposible for building the failure message.
 */
public class Failure {
    private JSONObject message; 
    private String machineID;
    private String sensorID;

    public Failure(SensorState sensorState, String machineID, String readingTime){
        this.message = new JSONObject(); 
        this.machineID = machineID;
        this.sensorID = sensorState.getId();
        message.put("machineID", machineID); 
        message.put("sensorID", sensorID);
        message.put("readingTime", readingTime);
    }

    public String getMessage(){
        return this.message.toString();
    }

    public JSONObject getJSONMessage(){
        return this.message;
    }

    public String getMachineID(){
        return this.machineID;
    }

    public String getSensorID(){
        return this.sensorID;
    }

    public void setFailureAction(FailureAction failureAction){
        message.put("action", failureAction);
    }

    public void setFailureType(FailureType failureType){
        message.put("failureType", failureType);
    }

    public void setFailureSeverity(FailureSeverity failureSeverity){
        message.put("failureSeverity", failureSeverity);
    }

    public void setDescription(String description){
        message.put("description", description);
    }

}
