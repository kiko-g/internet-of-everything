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
        // TODO: Instead of showing the production phase state, show the machine state (defect and production rate)
        // executor.scheduleWithFixedDelay(new Thread(() -> this.phases.showState()), 0, 5000, TimeUnit.MILLISECONDS);
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        //System.out.println(messageParsed);

        String machineID = messageParsed.getString("machineID");
        MachineNode machine = this.machinesGraph.getMachineNode(machineID);

        String action = messageParsed.getJSONObject("values").getString("action");

        // New sub-product was produced by the machine
        if(action.equals("OUT")){
            machine.updateOutCounter();
            System.out.println("=== Machine " + machineID + " total products = " + machine.getOutCount() + " ===");
        }
        // New subproduct was received by the machine
        else if(action.equals("IN")){
            machine.updateInCounter();
        }
    }
}
