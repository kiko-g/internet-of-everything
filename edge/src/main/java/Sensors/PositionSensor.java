package Sensors;

import java.util.ArrayList;
import org.json.JSONObject;

public class PositionSensor extends Sensor {
    Type type;
    Double posX;
    Double posY;

    public PositionSensor(String name, double positionX, double positionY, int updateInterval) {
        super(name, updateInterval);
        this.type = Type.POSITION;
        this.posX = positionX;
        this.posY = positionY;
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }

    public JSONObject getData() {
        //should have a configuration file with paths??
        //for now, dummy movements:
        JSONObject obj = createJSON("machineID", this.id, String.valueOf(this.type));
        JSONObject values = new JSONObject();
        if (!this.isOn){
            values.put("posX", "null");
            values.put("posY", "null");
        }
        else {
            this.generateData();
            values.put("posX", this.posX);
            values.put("posY", this.posY);
        }
        obj.put("values", values);
        return obj;
    }
}
