package ds.publisher;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;

import ds.Utils;
import ds.graph.Graph;
import ds.graph.MachineNode;

import java.util.*; 
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ProductSensor extends SensorSimulator {
    private Graph machinesGraph;
    private ScheduledThreadPoolExecutor executor;
    private Random rnd = new Random();

    public ProductSensor() throws MqttException {
        super("product");
        this.executor = new ScheduledThreadPoolExecutor(100);
    }

    public void init(){
        super.init();
        this.machinesGraph = new Graph();
        
        MachineNode machine;
        try {
            machine = this.machinesGraph.getStartMachine();
            int time = this.rnd.nextInt(2000 - 1000) + 1000;
            executor.scheduleWithFixedDelay(new Thread(() -> this.simulateInputOutput(machine)), time, time, TimeUnit.MILLISECONDS);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void simulateOutput(MachineNode startMachine){

        // Simulate defective product
        boolean higherDefectProbability = (rnd.nextInt(20) == 0);
        double defectProbability = 0;
        if(higherDefectProbability){
            double randomDeviation = Utils.getRandomDouble(10, 50);
            defectProbability = (startMachine.getDefectProbability() + randomDeviation)/100;
        } else {
            defectProbability = startMachine.getDefectProbability()/100;
        }
        boolean hasDefect = Utils.getRandomDouble(0, 1) >  ( 1 - defectProbability) ? true: false; 

        // Send output message
        String message = this.getOutputMessage(startMachine, hasDefect);
        this.publish(message);

        // Schedule next machine input message
        MachineNode nextMachine = startMachine.getNext();
        if(nextMachine != null && !hasDefect){            
            int timeIn = this.rnd.nextInt(2000 - 1000) + 1000;
            executor.schedule(new Thread(() -> this.simulateInputOutput(nextMachine)),timeIn,TimeUnit.MILLISECONDS);
        }
    }

    private void simulateInputOutput(MachineNode machine){

        // Send input message
        String message = this.getInputMessage(machine);
        this.publish(message);

        // Schedule output message
        int timeOut = this.rnd.nextInt(2000 - 1000) + 1000;
        executor.schedule(new Thread(() -> this.simulateOutput(machine)),timeOut,TimeUnit.MILLISECONDS);
    }


    /**
     * This method simulates reading of a product state
     */
    protected String getOutputMessage(MachineNode machine, boolean hasDefect){
        String readTime = Utils.getDateTime(); 

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machine.getId());
        messageObject.put("sensorID", "qrCodeOut");

        JSONObject values = new JSONObject();
        values.put("materialID", 0);
        values.put("action", "OUT");
        values.put("defect", hasDefect);
        messageObject.put("readingTime", readTime);
        messageObject.put("values", values);
        
        return messageObject.toString(); 
    }

        /**
     * This method simulates reading of a product state
     */
    protected String getInputMessage(MachineNode machine){
        String readTime = Utils.getDateTime(); 

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machine.getId());
        messageObject.put("sensorID", "qrCodeIn");

        JSONObject values = new JSONObject();
        values.put("materialID", 0);
        values.put("action", "IN");
        values.put("defect", false);
        messageObject.put("readingTime", readTime);
        messageObject.put("values", values);
        
        return messageObject.toString(); 
    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java ProductSensor");
        }

        try {

            ProductSensor productSensor = new ProductSensor();
            productSensor.init();

        } catch (MqttException e) {
            System.err.println("Error creating Product Sensor - " + e);
        }
    }
}
