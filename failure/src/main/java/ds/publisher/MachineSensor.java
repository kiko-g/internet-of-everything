package ds.publisher;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;

public class MachineSensor extends Sensor {
    private Random rnd = new Random();

    public MachineSensor() throws MqttException {
        super("production/machine");
    }

    /**
     * This method simulates reading the temperature from a Machine
     */
    @Override
    protected MqttMessage readSensor() {
        String message = getMessage();  

        System.out.println(message);

        byte[] payload = message.getBytes();        
        MqttMessage msg = new MqttMessage(payload); 
        return msg;
    }

    private String getMessage(){
        int machineID = this.rnd.nextInt(4 - 1) + 1;
        double temperature =  round(80 + this.rnd.nextDouble() * 20.0);
        String readTime = getDateTime(); 
        
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

    private String getDateTime(){
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        String formattedDate = myDateObj.format(myFormatObj);
        return formattedDate;
    }

    private double round(double value) {
        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(4, RoundingMode.HALF_UP);
        return bd.doubleValue();
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