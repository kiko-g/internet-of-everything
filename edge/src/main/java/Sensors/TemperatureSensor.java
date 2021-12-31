package Sensors;

import java.util.ArrayList;
import org.json.JSONObject;
public class TemperatureSensor extends Sensor {
    Type type;
    Double currentTemperature;

    public TemperatureSensor(String name, double averageTemperature, double temperatureStandardDeviation, int updateInterval) {
        super(name, averageTemperature, temperatureStandardDeviation, updateInterval);
        this.type = Type.TEMPERATURE;
        this.currentTemperature = null; //ºC
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentTemperature = null;
        else this.currentTemperature = this.generateRandomDataNormalDistribution();
    }

    public JSONObject getData() {
        JSONObject obj = createJSON("machineID", this.id, String.valueOf(this.type));
        JSONObject values = new JSONObject();
        if (!this.isOn) {
            values.put("temperature", "null");
        }
        else {
            this.generateData();
            obj.put("temperature", this.currentTemperature);
        }
        obj.put("values", values);
        return obj;
    }
}
