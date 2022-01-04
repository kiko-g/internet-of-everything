package Sensors;

import org.json.JSONObject;

public class PositionSensor extends Sensor {
    Type type;
    Double x;
    Double y;

    public PositionSensor(String name, String machineId, double x, double y, int updateInterval) {
        super(name, machineId, updateInterval);
        this.type = Type.POSITION;
        this.x = x;
        this.y = y;
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.x == null || this.y == null){
            values.put("x", "null");
            values.put("y", "null");
        }
        else {
            values.put("x", this.x);
            values.put("y", this.y);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }
}
