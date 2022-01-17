package ds;
import ds.graph.Graph;
import ds.listener.MachineListener;
import ds.listener.ProductListener;
import ds.server.Server;

public class FailureService {
    MachineListener machineListener;
    ProductListener productListener;
    Graph machinesGraph;
    Server server; 

    /**
     * Starts the failure service by activating the machine listener and product listener. 
     */
    public FailureService() {
        try {
            this.machinesGraph = new Graph();
            this.machineListener = new MachineListener(this.machinesGraph);
            this.productListener = new ProductListener(this.machinesGraph); 
            this.server = new Server();  
        } catch (Exception e){
            System.err.println("Not possible to initialize server");
            e.printStackTrace();
        }
    }

    public void init(){
        this.machineListener.init();
        this.productListener.init();
        this.server.init();
    }

    public static void main(String[] args) {
        FailureService failureService = new FailureService();
        failureService.init();
    }
}
