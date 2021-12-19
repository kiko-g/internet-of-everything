package ds.publisher;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;
import ds.publisher.Utils.*;

public class ProductSensor extends Sensor {
    public ProductSensor() throws MqttException {
        super("production/product");
    }

    /**
     * This method simulates reading of a product state
     */
    @Override
    protected String getMessage(){
        int machineID = 1; // TODO: generate messages with different machine ids
        String readTime = Utils.getDateTime(); 
        // TODO: in the future the product defects can be reported with other states
        String productState = "in"; // or 'out'

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", String.valueOf(machineID));
        messageObject.put("reading-time", readTime);
        messageObject.put("product-state", productState);
        
        return messageObject.toString(); 
    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java ProductSensor");
        }

        try {

            ProductSensor productSensor = new ProductSensor();
            productSensor.init();

        } catch (MqttException e) {
            System.err.println("Error creating Product Sensor - " + e);
        }
    }
}
