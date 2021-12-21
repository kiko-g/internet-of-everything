package ds.publisher;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;

import ds.graph.Graph;
import ds.graph.MachineNode;

import java.util.List;
import java.util.Random;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ProductSensor extends Sensor {
    private Graph machinesGraph;
    private ScheduledThreadPoolExecutor executor;
    private Random rnd = new Random();

    public ProductSensor() throws MqttException {
        super("production/product");
        this.executor = new ScheduledThreadPoolExecutor(100);
    }

    public void init(){
        super.init();
        this.machinesGraph = new Graph();
        
        for(MachineNode machine: this.machinesGraph.getStartMachines()){
            int time = this.rnd.nextInt(3000 - 2000) + 2000;
            executor.scheduleWithFixedDelay(new Thread(() -> this.simulateOutput(machine)), time, time, TimeUnit.MILLISECONDS);
        }
    }

    private void simulateOutput(MachineNode startMachine){
        // Send output message
        String message = this.getOutputMessage(startMachine);
        this.publish(message);

        List<MachineNode> nextMachines = startMachine.getNext();

        if(nextMachines.size() > 0){
            // Get one of the next machines
            Integer machineIdx = this.rnd.nextInt(nextMachines.size());
            MachineNode nextMachine = nextMachines.get(machineIdx.intValue());
            
            // Schedule next machine input message
            int timeIn = this.rnd.nextInt(2000 - 1000) + 1000;
            executor.schedule(new Thread(() -> this.simulateInputOutput(nextMachine, startMachine.getOutput())),timeIn,TimeUnit.MILLISECONDS);
        }
    }

    private void simulateInputOutput(MachineNode machine, String product){
        // Send input message
        machine.addCurrentInput(product);
        String message = this.getInputMessage(machine, product);
        this.publish(message);

        // Received enough subproducts from all child machines to produce its product
        if(machine.canProduce()){ 
            // Reset inputs
            machine.cleanProducedInput();

            // Schedule output message
            int timeOut = this.rnd.nextInt(2000 - 1000) + 1000;
            executor.schedule(new Thread(() -> this.simulateOutput(machine)),timeOut,TimeUnit.MILLISECONDS);
        }
    }


    /**
     * This method simulates reading of a product state
     */
    protected String getOutputMessage(MachineNode machine){
        String readTime = Utils.getDateTime(); 

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machine.getId());
        messageObject.put("reading-time", readTime);
        messageObject.put("product", machine.getOutput());
        messageObject.put("state", "out");
        
        return messageObject.toString(); 
    }

        /**
     * This method simulates reading of a product state
     */
    protected String getInputMessage(MachineNode machine, String product){
        String readTime = Utils.getDateTime(); 

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machine.getId());
        messageObject.put("reading-time", readTime);
        messageObject.put("product", product);
        messageObject.put("state", "in");
        
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
