package ds.listener;
import ds.FailureService;
import ds.Utils;
import ds.graph.Graph;
import ds.graph.sensor.*;
import ds.state.*; 
import ds.state.sensor.*;
import ds.failures.*;

import java.util.*;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONException;
import org.json.JSONObject;
import io.github.cdimascio.dotenv.Dotenv;

public class MachineListener extends Listener {
    private final State state; // Stores the current state of all machines.
    static Dotenv dotenv = Dotenv.load();
    public static final Integer INFO_SIZE = Integer.parseInt(dotenv.get("INFO_SIZE")); // Number of previous states to save
    public static final Integer FUTURE_BEHAVIOR = Integer.parseInt(dotenv.get("FUTURE_BEHAVIOUR")); // Number of previous with increasing/decreasing values to send an alert

    private final FailurePublisher failurePublisher;

    public MachineListener(Graph graph) {
        super("machine/#", graph);
        this.state = new State(graph); 
        this.failurePublisher = new FailurePublisher("failure");
        this.failurePublisher.init();
    }

    @Override
    public void messageArrived(String topic, MqttMessage message){
        try {
            JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
            this.updateState(messageParsed);
        } catch(JSONException e){
            this.sendGeneralFailure("Invalid message format", FailureType.FORMAT);
        } catch(Exception e){
            this.sendGeneralFailure(e.getMessage(), FailureType.UNKNOWN);
        }
    }

    /**
     * Updates a machine state.
     * @param messageParsed JSONObject with the message content.
     */
    public void updateState(JSONObject messageParsed) throws Exception {

        // Parse machine/sensor identification
        final String machineID;
        final String sensorID;
        try {
            machineID = messageParsed.getString("machineID"); 
            sensorID = messageParsed.getString("sensorID");
        } catch(JSONException e){
            this.sendGeneralFailure("Invalid format for machineID or sensorID", FailureType.FORMAT);
            return;
        }

        // Verify if machine exists
        if(!this.state.findMachine(machineID)){
            this.sendGeneralFailure("Unknown machineID", FailureType.UNKNOWN);
            return;
        }

        MachineState machineState = this.state.getMachineState(machineID);
        // Verify if sensor exists
        if(!machineState.findSensor(sensorID)){
            this.sendParseFailure(machineID, sensorID, "Unknow sensorID", FailureType.UNKNOWN);
            return;
        }

        // Verify reading time
        try {
            String readingTime = messageParsed.getString("readingTime");
            Utils.parseDateTime(readingTime);  
        } catch(Exception e){
            this.sendParseFailure(machineID, sensorID, "Invalid readingTime", FailureType.FORMAT);
            return;
        }

        // Parse sensor values
        SensorState sensorState = machineState.getSensorState(sensorID);
        try {
            JSONObject measureValues  = messageParsed.getJSONObject("values"); 
            measureValues.keySet().forEach((key) -> {
                try {
                    
                    // Check if measure exists
                    if(!sensorState.findMeasureState(key)){
                        this.sendParseFailure(machineID, sensorID, String.format("Unknow value '%s'", key), FailureType.UNKNOWN);
                        return;
                    }

                    double measureValue = measureValues.getDouble(key);
                    boolean isMeasureAllowed = sensorState.updateMeasureState(key, measureValue);

                    if (!isMeasureAllowed) sendFailure(messageParsed, sensorState, key);
                    else analyseFutureBehavior(messageParsed, sensorState, key);     

                } catch (JSONException e) {
                    this.sendParseFailure(machineID, sensorID, String.format("Invalid format for value '%s'", key), FailureType.FORMAT);
                } 
            });
        } catch (JSONException e) {
            this.sendParseFailure(machineID, sensorID, "Invalid values format", FailureType.FORMAT);
            return;
        }
    }

    private void analyseFutureBehavior(JSONObject messageParsed, SensorState sensorState, String measureType){  
        String machineID = messageParsed.get("machineID").toString(); 
        String readingTime = messageParsed.get("readingTime").toString();
        Failure failure = new Failure(sensorState, machineID, readingTime); 

        MeasureState measureState = sensorState.getMeasureState(measureType);
        
        Queue<Double> measures = measureState.getLastMeasures();    
        Iterator<Double> iterator = measures.iterator();

        Double prevVal = iterator.next();
        int numIncrease = 0;
        int numDecrease = 0;

        while (iterator.hasNext()) {
            Double currentVal = iterator.next();

            if (currentVal >= prevVal) {
                numIncrease += 1;
                numDecrease = 0;
            } 
            else {
                numDecrease += 1;
                numIncrease = 0;
            } 

            prevVal = currentVal;
        }

        // System.out.println("\nMachine " + machineID + " :: Sensor "  + sensorState.getId() + " :: Consecutive Increase = " + numIncrease + 
        //     "\nMachine " + machineID + " :: Sensor "  + sensorState.getId() + " :: Consecutive Decrease = " + numDecrease + "\n");
        
        this.sendFailureFuture(measureState, failure, numIncrease, numDecrease);
    }

    // TODO: Add action = WARNING to the message in order to integrate with V1
    // Maybe a new function in Failure like setAction would be a good option
    private void sendFailureFuture(MeasureState measureState, Failure failure, int numIncrease, int numDecrease){
        double upperLimit = measureState.getExpectedValues().max;
        double downLimit = measureState.getExpectedValues().min;
        double interval = (upperLimit - downLimit) / 8; 
        
        FailureType type;
        String log;
        int numConsecutive;
        double proximity;

        double proximityMax = measureState.getMaxProximity();
        double proximityMin = measureState.getMinProximity();
        
        if (proximityMax < proximityMin) {
            proximity = proximityMax;
            numConsecutive = numIncrease;
            type = FailureType.ABOVE_EXPECTED;
            log = "increasing";
        } else {
            proximity = proximityMin;
            numConsecutive = numDecrease;
            type = FailureType.UNDER_EXPECTED;
            log = "decreasing";
        } 

        // Sensor value near the limit
        if (proximity < interval) {
            if (numConsecutive >= FUTURE_BEHAVIOR) {          
                failure.setFailureType(type);
                failure.setFailureSeverity(FailureSeverity.MEDIUM);
                failure.setDescription("Values " + log + " too fast and near the limit");
            } else {
                failure.setFailureType(type);
                failure.setFailureSeverity(FailureSeverity.LOW);
                failure.setDescription("Values near the limit");
            }
        } else {
            return;
        }

        FailureService.serverState.setSensorFutureFailure(failure.getMessage());
        this.failurePublisher.publish(failure.getMessage(), failure.getMachineID());
    }

    // TODO: Add action = WARNING to the message in order to integrate with V1
    // Maybe a new function in Failure like setAction would be a good option
    public void sendFailure(JSONObject messageParsed, SensorState sensorState, String measureType){  
        String machineID = messageParsed.getString("machineID"); 
        String readingTime = messageParsed.getString("readingTime");
        double measureValue = messageParsed.getJSONObject("values").getDouble(measureType);
        Failure failure = new Failure(sensorState, machineID, readingTime); 
        Values expectedValues = sensorState.getMeasureState(measureType).getExpectedValues();

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

        FailureService.serverState.setSensorFailure(failure.getMessage());
        this.failurePublisher.publish(failure.getMessage(), machineID);
    }

    public void sendGeneralFailure(String description, FailureType failureType){  
        JSONObject failureMessage = new JSONObject(); 
        failureMessage.put("machineID", "null");
        failureMessage.put("sensorID", "null");
        // TODO: Add action = WARNING to the message in order to integrate with V1
        failureMessage.put("failureSeverity",  FailureSeverity.LOW);
        failureMessage.put("failureType",  failureType);
        failureMessage.put("description", description);
        failureMessage.put("readingTime", Utils.getDateTime());

        this.failurePublisher.publishUnknowFailure(failureMessage.toString());
    }

    public void sendParseFailure(String machineID, String sensorID, String description, FailureType failureType){  
        JSONObject failureMessage = new JSONObject(); 
        failureMessage.put("machineID", machineID);
        failureMessage.put("sensorID", sensorID);
        // TODO: Add action = WARNING to the message in order to integrate with V1
        failureMessage.put("failureSeverity",  FailureSeverity.LOW);
        failureMessage.put("failureType",  failureType);
        failureMessage.put("description", description);
        failureMessage.put("readingTime", Utils.getDateTime());

        this.failurePublisher.publish(failureMessage.toString(), machineID);
    }
}
