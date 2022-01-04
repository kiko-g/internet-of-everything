package Sensors;

import org.json.JSONObject;

public class MachineOrientationSensor extends Sensor {
    Type type;
    Double currentOrientation;

    public MachineOrientationSensor(String name, String machineId, double averageOrientation, double orientationStandardDeviation, int updateInterval) {
        super(name, machineId, averageOrientation, orientationStandardDeviation, updateInterval);
        this.type = Type.MACHINE_DIRECTION;
        this.currentOrientation = null; // degrees
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.currentOrientation == null) {
            values.put("orientation", "null");
        }
        else {
            values.put("orientation", this.currentOrientation);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }
}
