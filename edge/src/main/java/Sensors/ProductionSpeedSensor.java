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
        JSONObject obj = new JSONObject();
        if (!this.isOn) {
            obj.put("value", "null");
        }
        else {
            this.generateData();
            obj.put("value", this.currentSpeed);
        }
        return obj;
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentSpeed = null;
        else this.currentSpeed = this.generateRandomDataNormalDistribution();
    }
}
