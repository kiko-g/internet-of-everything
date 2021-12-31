package Sensors;

import java.util.ArrayList;
import org.json.JSONObject;

public class MachineDirectionSensor extends Sensor {
    Type type;
    Double currentDirection;

    public MachineDirectionSensor(String name, double averageDirection, double directionStandardDeviation, int updateInterval) {
        super(name, averageDirection, directionStandardDeviation, updateInterval);
        this.type = Type.MACHINE_DIRECTION;
        this.currentDirection = null; // degrees
    }

    public JSONObject getData() {
        JSONObject obj = createJSON("machineID", this.id, String.valueOf(this.type));
        JSONObject values = new JSONObject();
        if (!this.isOn) {
            values.put("direction", "null");
        }
        else {
            this.generateData();
            values.put("direction", this.currentDirection);
        }
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }
}
