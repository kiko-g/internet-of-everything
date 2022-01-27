package ds.listener;
import ds.Utils;
import ds.graph.Graph;
import ds.graph.sensor.*;
import ds.state.*; 
import ds.state.sensor.*;
import ds.failures.*;

import java.util.*;


import com.mongodb.client.MongoCollection;

import org.bson.Document;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONException;
import org.json.JSONObject;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Listens to the messages of the sensors, detects failures and reports them back to the machines
 */
public class MachineListener extends Listener {
    private final State state; // Stores the current state of all machines.

    public static final Integer INFO_SIZE = Integer.parseInt(Dotenv.load().get("INFO_SIZE")); // Number of previous states to save
    public static final Integer FUTURE_BEHAVIOR = Integer.parseInt(Dotenv.load().get("FUTURE_BEHAVIOUR")); // Number of previous with increasing/decreasing values to send an alert
    private MongoCollection<Document> collection;

    private final FailurePublisher failurePublisher;

    public MachineListener(Graph graph, MongoCollection<Document> collection) {
        super("machine/#", graph);
        this.state = new State(graph); 
        this.collection = collection;
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
     * Update the state of a machine
     * @param messageParsed JSONObject with the message content.
     */
    public void updateState(JSONObject messageParsed) {
        FailureMessageBuilder failureMessageBuilder = new FailureMessageBuilder(messageParsed, this.state);
        if (failureMessageBuilder.containsError()){
            this.sendParseFailure(failureMessageBuilder.getFailureMessage());
            return;
        }

        // Parse machine/sensor identification
        final String machineID = messageParsed.getString("machineID");
        final String sensorID = messageParsed.getString("sensorID");
        MachineState machineState = this.state.getMachineState(machineID);

        // Parse sensor values
        SensorState sensorState = machineState.getSensorState(sensorID);
        try {
            JSONObject measureValues  = messageParsed.getJSONObject("values"); 
            measureValues.keySet().forEach((key) -> {
                try {
                    // Check if measure exists
                    if(!sensorState.findMeasureState(key)){
                        failureMessageBuilder.setGenericError(String.format("Unknow value '%s'", key), FailureType.UNKNOWN, FailureAction.WARNING);
                        this.sendParseFailure(failureMessageBuilder.getFailureMessage());
                        return;
                    }

                    double measureValue = measureValues.getDouble(key);
                    boolean isMeasureAllowed = sensorState.updateMeasureState(key, measureValue);

                    if (!isMeasureAllowed) sendFailure(messageParsed, sensorState, key);
                    else analyseFutureBehavior(messageParsed, sensorState, key);     

                } catch (JSONException e) {
                    failureMessageBuilder.setGenericError(String.format("Invalid format for value '%s'", key), FailureType.FORMAT, FailureAction.WARNING);
                    this.sendParseFailure(failureMessageBuilder.getFailureMessage());
                }
            });
        } catch (JSONException e) {
            failureMessageBuilder.setGenericError("Invalid values format", FailureType.FORMAT, FailureAction.WARNING);
            this.sendParseFailure(failureMessageBuilder.getFailureMessage());
        }
    }

    /**
     * Detect an error in the near future
     */
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

        this.sendFailureFuture(measureState, failure, numIncrease, numDecrease);
    }

    
     /**
     * Send prediction/warning of a possible failure relative to the value of a sensor
     */ 
    private void sendFailureFuture(MeasureState measureState, Failure failure, int numIncrease, int numDecrease){
        double upperLimit = measureState.getExpectedValues().max;
        double downLimit = measureState.getExpectedValues().min;
        double interval = (upperLimit - downLimit) / 8; 
        
        FailureType type;
        FailureAction action = FailureAction.WARNING;

        String log;
        int numConsecutive;
        double proximity;

        double proximityMax = measureState.getMaxProximity();
        double proximityMin = measureState.getMinProximity();
        
        String sensorName = failure.getSensorID();
        if (proximityMax < proximityMin) {
            proximity = proximityMax;
            numConsecutive = numIncrease;
            type = FailureType.ABOVE_EXPECTED;
            if (sensorName.contains("temperature")) {
                action = FailureAction.INCREASE_FANS;
            } else if(sensorName.contains("vibration")) {
                action = FailureAction.DECREASE_GEAR_SPEED;
            }

            log = "increasing";
        } else {
            proximity = proximityMin;
            numConsecutive = numDecrease;
            type = FailureType.UNDER_EXPECTED;
            if (sensorName.contains("temperature")) {
                action = FailureAction.DECREASE_FANS;
            } else if(sensorName.contains("vibration")) {
                action = FailureAction.INCREASE_GEAR_SPEED;
            } 
            
            log = "decreasing";
        } 

        // Sensor value near the limit
        if (proximity < interval) {
            if (numConsecutive >= FUTURE_BEHAVIOR) {          
                failure.setFailureType(type);
                failure.setFailureAction(action);
                failure.setFailureSeverity(FailureSeverity.MEDIUM);
                failure.setDescription("Values " + log + " too fast and near the limit");
            } else {
                failure.setFailureType(type);
                failure.setFailureAction(action);
                failure.setFailureSeverity(FailureSeverity.LOW);
                failure.setDescription("Values near the limit");
            }
        } else {
            return;
        }

        // Add failure to the database and publish it to the machine
        this.insertIntoDatabase(failure.getJSONMessage());
        this.failurePublisher.publish(failure.getMessage(), failure.getMachineID());
    }

     /**
     * Send a failure relative to the value of a sensor
     */ 
    public void sendFailure(JSONObject messageParsed, SensorState sensorState, String measureType){  
        String machineID = messageParsed.getString("machineID"); 
        String readingTime = messageParsed.getString("readingTime");
        double measureValue = messageParsed.getJSONObject("values").getDouble(measureType);
        Failure failure = new Failure(sensorState, machineID, readingTime); 
        Values expectedValues = sensorState.getMeasureState(measureType).getExpectedValues();

        if (measureValue > expectedValues.getMax()) {
            failure.setFailureType(FailureType.ABOVE_EXPECTED);
            failure.setFailureAction(FailureAction.POWEROFF);
            failure.setFailureSeverity(FailureSeverity.HIGH);
            failure.setDescription("Detected value: " + measureValue);
        }
        else if (measureValue < expectedValues.getMin()) {
            failure.setFailureType(FailureType.UNDER_EXPECTED);
            failure.setFailureAction(FailureAction.POWEROFF);
            failure.setFailureSeverity(FailureSeverity.HIGH);
            failure.setDescription("Detected value: " + measureValue);
        }

        // Add failure to the database and publish it to the machine
        this.insertIntoDatabase(failure.getJSONMessage());
        this.failurePublisher.publish(failure.getMessage(), machineID);
    }

     /**
     * Send a failure that is not related to any particular machine
     */  
    public void sendGeneralFailure(String description, FailureType failureType){  
        JSONObject failureMessage = new JSONObject(); 
        failureMessage.put("machineID", "null");
        failureMessage.put("sensorID", "null");
        failureMessage.put("action", FailureAction.WARNING);
        failureMessage.put("failureSeverity",  FailureSeverity.LOW);
        failureMessage.put("failureType",  failureType);
        failureMessage.put("description", description);
        failureMessage.put("readingTime", Utils.getDateTime());

        this.failurePublisher.publishUnknowFailure(failureMessage.toString());
    }

    /**
     * Send a failure of a specific machine, that occured due to a format or unknow error in the message
     */ 
    public void sendParseFailure(JSONObject failureMessage){
        if (!failureMessage.get("machineID").equals("null")) {
            this.insertIntoDatabase(failureMessage);
            this.failurePublisher.publish(failureMessage.toString(), failureMessage.getString("machineID"));
        } else {
            this.failurePublisher.publishUnknowFailure(failureMessage.toString());
        }
    }

    /**
     * Add a failure to the database
     */
    public void insertIntoDatabase(JSONObject message){
        try {
            this.collection.insertOne(new Document()
                    .append("machineID", message.getString("machineID"))
                    .append("sensorID", message.getString("sensorID"))
                    .append("action", ((FailureAction) message.get("action")).name())
                    .append("failureType", ((FailureType) message.get("failureType")).name())
                    .append("failureSeverity", ((FailureSeverity) message.get("failureSeverity")).name())
                    .append("description", message.getString("description"))
                    .append("readingTime", message.getString("readingTime"))
                    .append("dateFailure", new Date()));

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
