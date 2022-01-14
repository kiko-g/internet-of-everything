package ds;
import ds.graph.Graph;
import ds.listener.MachineListener;
import ds.listener.ProductListener;

public class FailureService {
    MachineListener machineListener;
    ProductListener productListener;
    Graph machinesGraph;

    /**
     * Starts the failure service by activating the machine listener and product listener. 
     */
    public FailureService(){
        this.machinesGraph = new Graph();
        this.machineListener = new MachineListener(this.machinesGraph);
        this.productListener = new ProductListener(this.machinesGraph); 
    }

    public void init(){
        this.machineListener.init();
        this.productListener.init();
    }

    public static void main(String[] args) {
        FailureService failureService = new FailureService();
        failureService.init();
    }
}
