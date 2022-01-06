package Sensors;

import org.json.JSONObject;

public class MachineVelocitySensor extends Sensor {
    Type type;
    Double currentVelocity;

    public MachineVelocitySensor(String name, String machineId, double averageVelocity, double velocityStandardDeviation, int updateInterval) {
        super(name, machineId, averageVelocity, velocityStandardDeviation, updateInterval);
        this.type = Type.VELOCITY;
        this.currentVelocity = null; // meters/s
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.currentVelocity == null) {
            values.put("velocity", "null");
        }
        else {
            values.put("velocity", this.currentVelocity);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        System.err.println("Generate of data " + this.getName() + " not implemented.");
    }
}
