package ds.listener;

import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import ds.graph.Graph;
import ds.graph.MachineNode;
import ds.graph.Phases;

public class ProductListener extends Listener {
    Phases phases;
    ScheduledThreadPoolExecutor executor;

    public ProductListener(Graph graph) {
        super("production/product", graph); 
        this.phases = new Phases(graph);
    }

    public void init(){
        super.init();
        this.executor = new ScheduledThreadPoolExecutor(5);
        executor.scheduleWithFixedDelay(new Thread(() -> this.phases.showState()), 0, 5000, TimeUnit.MILLISECONDS);
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        //System.out.println(messageParsed);

        String machineID = messageParsed.getString("machineID");
        String state = messageParsed.getString("state");
        MachineNode machine = this.machinesGraph.getMachineNode(machineID);

        // New sub-product was produced by the machine
        if(state.equals("out")){
            machine.updateCounter();
            //System.out.println("=== Machine " + machineID + " total products = " + machine.getProductCount() + " ===");
        }
        // New subproduct was received by the machine
        else if(state.equals("in")){
            String product = messageParsed.getString("product");
            machine.addCurrentInput(product);
        }
    }
}
