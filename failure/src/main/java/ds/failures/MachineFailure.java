package ds.failures;
import ds.state.MachineState;

import org.json.JSONObject;

/**
 * This class is responsible for processing machine failures
 */
public abstract class MachineFailure {
    abstract public void checkMachine(MachineState currentState);

    abstract protected String futureBehaviour(MachineState machineState);

    abstract protected String takeAction(String machineID);

    protected String getResponseMessage(String machineID, String status, int errorID) {
        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machineID);
        messageObject.put("status", status);
        // messageObject.put("time-until-failure", readTime);
        messageObject.put("errorID", errorID);
        messageObject.put("description", "null");
        
        return messageObject.toString(); 
    }
}