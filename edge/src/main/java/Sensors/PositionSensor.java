package Sensors;

import org.json.JSONObject;

public class PositionSensor extends Sensor {
    Type type;
    Double xMax;
    Double xMin;
    Double xAvg;
    Double yMax;
    Double yMin;
    Double yAvg;
    Double xStandardDeviation;
    Double yStandardDeviation;

    public PositionSensor(String name, String machineId, double xMax, double xMin, double xAvg, double yMax, double yMin, double yAvg, double xStandardDeviation, double yStandardDeviation, double updateInterval) {
        super(name, machineId, updateInterval);
        this.type = Type.POSITION;
        this.xMax = xMax;
        this.xMin = xMin;
        this.xAvg = xAvg;
        this.yMax = yMax;
        this.yMin = yMin;
        this.yAvg = yAvg;
        this.xStandardDeviation = xStandardDeviation;
        this.yStandardDeviation = yStandardDeviation;
    }

    @Override
    public void generateData() {
        //System.err.println("Generate of data " + this.getName() + " not implemented.");
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        /*if (!this.isOn || this.x == null || this.y == null){
            values.put("x", "null");
            values.put("y", "null");
        }
        else {
            values.put("x", this.x);
            values.put("y", this.y);
        }*/

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }
}
