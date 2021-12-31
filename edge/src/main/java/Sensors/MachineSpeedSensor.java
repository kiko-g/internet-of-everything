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
        JSONObject obj = createJSON("machineID", this.id, String.valueOf(this.type));
        JSONObject values = new JSONObject();
        if (!this.isOn) {
            values.put("speed", "null");
        }
        else {
            this.generateData();
            obj.put("speed", this.currentSpeed);
        }
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }
}
