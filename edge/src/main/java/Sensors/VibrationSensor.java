package Sensors;

import java.util.ArrayList;
import org.json.JSONObject;
public class VibrationSensor extends Sensor {
    Type type;
    Double currentVibration;

    public VibrationSensor(String name, double averageVibration, double vibrationStandardDeviation, int updateInterval) {
        super(name, averageVibration, vibrationStandardDeviation, updateInterval);
        this.type = Type.VIBRATION;
        this.currentVibration = null; // Hertz
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentVibration = null;
        else this.currentVibration = this.generateRandomDataNormalDistribution();
    }

    public JSONObject getData() {
        JSONObject obj = new JSONObject();
        if (!this.isOn){
            obj.put("value", "null");
        }
        else {
            this.generateData();
            obj.put("value", this.currentVibration);
        }
        return obj;
    }
}