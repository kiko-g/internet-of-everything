import ds.listener.MachineListener;
import ds.listener.ProductListener;

public class FailureService {
    MachineListener machineListener;
    ProductListener productListener;

    public FailureService(){
        machineListener = new MachineListener();
        productListener = new ProductListener();
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
