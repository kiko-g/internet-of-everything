package ds.listener;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import ds.Utils;
import ds.graph.Graph;
import ds.graph.MachineNode;

public class ProductListener extends Listener {
    private ScheduledThreadPoolExecutor executor;
    private ProductionState productionState;

    public ProductListener(Graph graph) {
        super("product", graph);
        this.productionState = new ProductionState(new ArrayList<String>(this.machinesGraph.getMachines()));
    }

    public void init(){
        super.init();
        this.executor = new ScheduledThreadPoolExecutor(5);
        executor.scheduleWithFixedDelay(new Thread(() -> this.showState()), 0, 5000, TimeUnit.MILLISECONDS);
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
       
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        //System.out.println(messageParsed);

        String machineID = messageParsed.getString("machineID");
        MachineNode machine = this.machinesGraph.getMachineNode(machineID);

        String action = messageParsed.getJSONObject("values").getString("action");
        boolean defect = messageParsed.getJSONObject("values").getBoolean("defect");
        LocalDateTime readTime = Utils.parseDateTime(messageParsed.getString("readingTime"));

        // New sub-product was produced by the machine
        if(action.equals("OUT")){
            machine.updateOutCounter();

            this.productionState.saveProductionTime(machineID, readTime);

            if(defect){
                machine.addDefectiveProduct();
                System.out.println("MachineID :: " + machine.getId() + ":: Defective Product");
            }
        }
        // New subproduct was received by the machine
        else if(action.equals("IN")){
            machine.updateInCounter();
            this.productionState.saveInputTime(machineID, readTime);
        }
    }

    public void showState(){
        String leftAlignFormat = "| %-7s | %-7d | %-11f | %-8d | %-20s | %-15s |%n";
        StringBuilder sb = new StringBuilder();

        sb.append(String.format("%n+---------+---------+-------------+----------+----------------------+-----------------+%n"));
        sb.append(String.format("| Machine | Defects | Defect Rate | Products | Mean Production Time | Production Rate |%n"));
        sb.append(String.format("+---------+---------+-------------+----------+----------------------+-----------------+%n"));

        for(String machineID : this.machinesGraph.getMachines()){
            MachineNode machine = this.machinesGraph.getMachineNode(machineID);

            sb.append(String.format(leftAlignFormat,
                machineID, 
                machine.getDefectiveCount(), 
                machine.getDefectRate(), 
                machine.getOutCount(), 
                Utils.formatDouble(this.productionState.getProductionTime(machine)) + " ms",
                Utils.formatDouble(this.productionState.getProductionRate(machine)) + "/s"));    
        }

        sb.append(String.format("+---------+---------+-------------+----------+----------------------+-----------------+%n"));
        System.out.println(sb.toString());
    }
}
