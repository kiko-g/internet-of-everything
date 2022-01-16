package ds.publisher;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;

import ds.Utils;
import ds.graph.Graph;
import ds.graph.MachineNode;
import ds.graph.sensor.Sensor;
import ds.graph.sensor.Values;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MachineSensor extends SensorSimulator {
    private Graph machinesGraph;
    private List<String> machineIds;
    private Random rnd = new Random();
    private ScheduledThreadPoolExecutor executor;

    public MachineSensor() throws MqttException {
        super("machine");
        this.machinesGraph = new Graph();
        this.machineIds = new ArrayList<String>(this.machinesGraph.getMachines());
        this.executor = new ScheduledThreadPoolExecutor(10);
    }

    public void init(){
        super.init();

        //Start Publishing with fixed delay
        Thread messageGenerator = new Thread(() -> this.sendMessage());
        executor.scheduleWithFixedDelay(messageGenerator, 0, 1500, TimeUnit.MILLISECONDS);
    }

    /**
     * This method simulates reading of the properties of a Machine
     */
    protected void sendMessage(){
        int machineIdx = this.rnd.nextInt(this.machineIds.size());
        MachineNode machine = this.machinesGraph.getMachineNode(this.machineIds.get(machineIdx));
        String readTime = Utils.getDateTime(); 
        
        List<String> sensorIds = new ArrayList<String>(machine.getSensors().keySet());
        int sensorIdx = this.rnd.nextInt(sensorIds.size());
        Sensor sensor = machine.getSensor(sensorIds.get(sensorIdx));
        
        //Generate random values for each sensor
        JSONObject valuesJson = new JSONObject(); 
        double errorProbability = 0.3; 
        ConcurrentHashMap<String, Values> values = sensor.getValues();  
        values.forEach((key, value) -> {
            boolean hasError = Utils.getRandomDouble(0, 1) >  ( 1 - errorProbability) ? true: false; 
            double min = value.getMin();  
            double max = value.getMax();  
            double currentValue = 0; 

            if (hasError){
                double randomDeviation = Utils.getRandomDouble(1, 20);
                if (this.rnd.nextInt(1) == 0) 
                    currentValue = min - randomDeviation;  
                else 
                    currentValue = max + randomDeviation; 
            }  else {
                currentValue = Utils.getRandomDouble(min, max);
            }
            valuesJson.put(key, currentValue);
        });

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machine.getId());
        messageObject.put("sensorID", sensor.getId());
        messageObject.put("readingTime", readTime);
        messageObject.put("values", valuesJson);
        
        this.publish(messageObject.toString());
    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java MachineSensor");
        }

        try {
            MachineSensor machineSensor = new MachineSensor();
            machineSensor.init();

        } catch (MqttException e) {
            System.err.println("Error creating Machine Sensor - " + e);
        }
    }
}