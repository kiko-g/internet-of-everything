package Sensors;

import java.util.ArrayList;
import org.json.JSONObject;

public class ProductionSpeedSensor extends Sensor {
    Type type;
    Double currentSpeed;

    public ProductionSpeedSensor(String name, double averageSpeed, double speedStandardDeviation, int updateInterval) {
        super(name, averageSpeed, speedStandardDeviation, updateInterval);
        this.type = Type.PRODUCTION_SPEED;
        this.currentSpeed = null; //antennas/min
    }

    public JSONObject getData() {
        JSONObject obj = createJSON("machineID", this.id, String.valueOf(this.type));
        JSONObject values = new JSONObject();
        if (!this.isOn) {
            values.put("production", "null");
        }
        else {
            this.generateData();
            values.put("production", this.currentSpeed);
        }
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentSpeed = null;
        else this.currentSpeed = this.generateRandomDataNormalDistribution();
    }
}
