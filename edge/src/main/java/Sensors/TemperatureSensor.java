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
        JSONObject obj = new JSONObject();
        if (!this.isOn) {
            obj.put("value", "null");
        }
        else {
            this.generateData();
            obj.put("value", this.currentTemperature);
        }
        return obj;
    }
}
