package ds.publisher;
import java.util.Random;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;
import ds.publisher.Utils.*;

public class MachineSensor extends Sensor {
    private Random rnd = new Random();

    public MachineSensor() throws MqttException {
        super("production/machine");
    }

    /**
     * This method simulates reading of the properties of a Machine
     */
    @Override
    protected String getMessage(){
        int machineID = this.rnd.nextInt(4 - 1) + 1;
        double temperature =  Utils.round(80 + this.rnd.nextDouble() * 20.0);
        String readTime = Utils.getDateTime(); 
        
        JSONObject propertiesObject = new JSONObject();

        propertiesObject.put("temperature", temperature);
        propertiesObject.put("piecesProduced", 0);
        propertiesObject.put("volt",16);
        propertiesObject.put("vibration", 35.1788);
        propertiesObject.put("pressure",109.2486);
        propertiesObject.put("rotate", 402.7474);

        JSONObject messageObject = new JSONObject();
        messageObject.put("machineID", String.valueOf(machineID));
        messageObject.put("reading-time", readTime);
        messageObject.put("properties", propertiesObject);
        
        return messageObject.toString(); 
    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java MachineSensor");
        }

        try {
            MachineSensor machineSensor = new MachineSensor();
            machineSensor.init();

        } catch (MqttException e) {
            System.err.println("Error creating Machine Sensor - " + e);
        }
    }
}