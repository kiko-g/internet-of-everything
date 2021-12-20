package ds.listener;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

public class ProductListener extends Listener {

    public ProductListener() {
        super("production/product"); 
    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java ProductListener");
            System.out.println("e.g. java ProductListener");
        }

        ProductListener productListener = new ProductListener();
        productListener.init();  
    }
}
