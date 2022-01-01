package ds.failures;
import ds.state.sensor.*;
import org.json.JSONObject;

/**
 * Class resposible for building the failure message.
 */
public class Failure {
    JSONObject message; 

    public Failure(SensorState sensorState, String machineID, String readingTime){
        this.message = new JSONObject(); 
        message.put("machineID", machineID); 
        message.put("sensorID", sensorState.getId());
        message.put("readingTime", readingTime);
    }

    public String getMessage(){
        return this.message.toString();
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
