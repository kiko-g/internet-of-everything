package ds.listener;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import ds.graph.Graph;
import ds.graph.MachineNode;

public class ProductListener extends Listener {
    Graph machinesGraph;

    public ProductListener(Graph graph) {
        super("production/product");
        this.machinesGraph = graph; 
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        System.out.println(messageParsed);

        String machineID = messageParsed.getString("machineID");
        String state = messageParsed.getString("state");
        String product = messageParsed.getString("product");
        
        MachineNode machine = this.machinesGraph.getMachineNode(machineID);

        // New sub-product was produced by the machine
        if(state.equals("out")){
            machine.updateCounter();
            System.out.println("=== Machine " + machineID + " total products = " + machine.getProductCount() + " ===");
        }
        // New subproduct was received by the machine
        else if(state.equals("in")){
            machine.addCurrentInput(product);
        }
    }
}
