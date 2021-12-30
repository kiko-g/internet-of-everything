package Sensors;

import java.util.ArrayList;
import org.json.JSONObject;

public class MachineSpeedSensor extends Sensor {
    Type type;
    Double currentSpeed;

    public MachineSpeedSensor(String name, double averageSpeed, double speedStandardDeviation, int updateInterval) {
        super(name, averageSpeed, speedStandardDeviation, updateInterval);
        this.type = Type.MACHINE_SPEED;
        this.currentSpeed = null; // meters/s
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
        // do nothing, for now machines are static
    }
}
