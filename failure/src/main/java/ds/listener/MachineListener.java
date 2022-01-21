package ds.listener;
import ds.FailureService;
import ds.graph.Graph;
import ds.graph.sensor.*;
import ds.state.*; 
import ds.state.sensor.*;
import ds.failures.*;

import java.util.*;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class MachineListener extends Listener {
    private final State state; // Stores the current state of all machines.
    public static final Integer INFO_SIZE = Integer.parseInt(System.getenv("INFO_SIZE")); // Number of previous states to save 
    public static final Integer FUTURE_BEHAVIOR = Integer.parseInt(System.getenv("FUTURE_BEHAVIOUR")); // Number of previous with increasing/decreasing values to send an alert

    private final FailurePublisher failurePublisher;

    public MachineListener(Graph graph) {
        super("machine/#", graph);
        this.state = new State(graph); 
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
            try {
                double measureValue = measureValues.getDouble(key);
                boolean isMeasureAllowed = sensorState.updateMeasureState(key, measureValue);

                if (!isMeasureAllowed) sendFailure(messageParsed, sensorState, key);
                else analyseFutureBehavior(messageParsed, sensorState, key);   
            }
            catch (Exception e) {
                // e.printStackTrace();
                System.out.println("Error Reading sensor " + sensorID + " from machine " + machineID);
            }
        });
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

    public void sendFailure(JSONObject messageParsed, SensorState sensorState, String measureType){  
        String machineID = messageParsed.get("machineID").toString(); 
        String readingTime = messageParsed.get("readingTime").toString();
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

}
