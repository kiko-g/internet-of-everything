package ds.publisher;
import java.util.Random;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class MachineSensor extends Sensor {
    private Random rnd = new Random();
    private ScheduledThreadPoolExecutor executor;

    public MachineSensor() throws MqttException {
        super("production/machine");
        this.executor = new ScheduledThreadPoolExecutor(10);
    }

    public void init(){
        super.init();

        // Start Publishing with fixed delay
        Thread messageGenerator = new Thread(() -> this.sendMessage());
        executor.scheduleWithFixedDelay(messageGenerator, 0, 1500, TimeUnit.MILLISECONDS);
    }

    /**
     * This method simulates reading of the properties of a Machine
     */
    protected void sendMessage(){
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
        
        this.publish(messageObject.toString());
    }

    public static void main(String[] args) {

        if(args.length > 0){
            System.err.println("Usage: java MachineSensor");
        }

        try {
            MachineSensor machineSensor = new MachineSensor();
            //machineSensor.init();

        } catch (MqttException e) {
            System.err.println("Error creating Machine Sensor - " + e);
        }
    }
}