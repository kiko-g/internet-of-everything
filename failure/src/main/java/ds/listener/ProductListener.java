package ds.listener;

import java.util.concurrent.ScheduledThreadPoolExecutor;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import ds.graph.Graph;
import ds.graph.MachineNode;

public class ProductListener extends Listener {
    ScheduledThreadPoolExecutor executor;

    public ProductListener(Graph graph) {
        super("production/product", graph);
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

        // New sub-product was produced by the machine
        if(action.equals("OUT")){
            machine.updateOutCounter();
            if(defect){
                machine.addDefectiveProduct();
                System.out.println("MachineID :: " + machine.getId() + ":: Defective Product");
            }
        }
        // New subproduct was received by the machine
        else if(action.equals("IN")){
            machine.updateInCounter();
        }
    }

    public void showState(){
        try {
            String leftAlignFormat = "| %-7s | %-9d | %-11f | %-7d |%n";

            System.out.format("\n+---------+-----------+------------+----------+%n");
            System.out.format("| Machine | Defective | Defect Rate |  Total  |%n");
            System.out.format("+---------+-----------+-------------+---------+%n");
    
            for(String machineID : this.machinesGraph.getMachines()){
                MachineNode machine = this.machinesGraph.getMachineNode(machineID);
    
                System.out.format(leftAlignFormat, machineID, machine.getDefectiveCount(), 
                    machine.getDefectRate(), machine.getOutCount());    
            }
    
            System.out.format("+---------+-----------+-------------+---------+%n\n");
        } catch(Exception e){
            System.out.println(e.toString());
        }
       
    }
}
