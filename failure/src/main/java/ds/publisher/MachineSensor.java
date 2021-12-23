package ds.publisher;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;

import ds.graph.Graph;
import ds.graph.MachineNode;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MachineSensor extends Sensor {
    private Graph machinesGraph;
    private List<String> machineIds;
    private Random rnd = new Random();
    private ScheduledThreadPoolExecutor executor;

    public MachineSensor() throws MqttException {
        super("production/machine");
        this.machinesGraph = new Graph();
        this.machineIds = new ArrayList<String>(this.machinesGraph.getMachines());
        this.executor = new ScheduledThreadPoolExecutor(10);
    }

    public void init(){
        super.init();

        // Start Publishing with fixed delay
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

        // Generate random temperature
        float max = machine.getDefaults().get("temperature") + 3;
        float min = machine.getDefaults().get("temperature") - 5;
        float temperature =  Utils.getRandomFloat(min, max);
        
        JSONObject propertiesObject = new JSONObject();

        propertiesObject.put("temperature", temperature);
        propertiesObject.put("piecesProduced", 0);
        propertiesObject.put("volt",16);
        propertiesObject.put("vibration", 35.1788);
        propertiesObject.put("pressure",109.2486);
        propertiesObject.put("rotate", 402.7474);

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", machine.getId());
        messageObject.put("reading-time", readTime);
        messageObject.put("properties", propertiesObject);
        
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