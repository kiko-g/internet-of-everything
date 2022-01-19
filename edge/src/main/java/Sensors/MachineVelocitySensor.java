package Sensors;

import org.json.JSONObject;

public class MachineVelocitySensor extends Sensor {
    Type type;
    Double currentVelocity;
    Double velocityMin;
    Double velocityMax;

    public MachineVelocitySensor(String name, String machineId, double velMin, double velMax, double averageVelocity, double velocityStandardDeviation, double updateInterval) {
        super(name, machineId, averageVelocity, velocityStandardDeviation, updateInterval);
        this.type = Type.VELOCITY;
        this.velocityMin = velMin;
        this.velocityMax = velMax;
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
        //System.err.println("Generate of data " + this.getName() + " not implemented.");
    }
}
