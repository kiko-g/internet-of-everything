package ds;
import ds.graph.Graph;
import ds.listener.MachineListener;
import ds.listener.ProductListener;

public class FailureService {
    MachineListener machineListener;
    ProductListener productListener;
    Graph machinesGraph;

    public FailureService(){
        this.machinesGraph = new Graph();
        this.machineListener = new MachineListener();
        this.productListener = new ProductListener(this.machinesGraph); 
    }

    public void init(){
        machineListener.init();
        productListener.init();
    }

    public static void main(String[] args) {
        FailureService failureService = new FailureService();
        failureService.init();
    }
}
