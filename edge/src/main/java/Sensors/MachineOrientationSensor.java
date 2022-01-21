package Sensors;

import org.json.JSONObject;

public class MachineOrientationSensor extends Sensor {
    Type type;
    Double currentOrientation;
    Double orientationMin;
    Double orientationMax;

    public MachineOrientationSensor(String name, String machineId, double orientationMin, double orientationMax, double averageOrientation, double orientationStandardDeviation, double updateInterval) {
        super(name, machineId, averageOrientation, orientationStandardDeviation, updateInterval);
        this.type = Type.MACHINE_DIRECTION;
        this.orientationMax = orientationMax;
        this.orientationMin = orientationMin;
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
        //System.err.println("Generate of data " + this.getName() + " not implemented.");
    }
}
