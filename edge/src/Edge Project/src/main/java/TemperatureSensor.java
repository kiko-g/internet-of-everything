import java.util.Random;

import org.eclipse.paho.client.mqttv3.*;

public class TemperatureSensor extends MachineSensor {

    private Random rnd = new Random();

    public TemperatureSensor() throws MqttException {
        super("temperature");
    }

    /**
     * This method simulates reading the temperature from a Machine
     */
    @Override
    protected MqttMessage readSensor() {
        double temperature =  80 + rnd.nextDouble() * 20.0;        
        byte[] payload = String.format("T:%04.2f",temperature).getBytes();        
        MqttMessage msg = new MqttMessage(payload); 
        return msg;
    }
}