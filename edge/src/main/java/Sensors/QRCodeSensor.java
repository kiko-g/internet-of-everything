package Sensors;
import org.json.JSONObject;
public class QRCodeSensor extends Sensor {
    public enum Action {IN, OUT}

    Type type;
    String materialID;
    Action action;
    boolean defect;

    public QRCodeSensor(String name, String machineId, String action, double updateInterval) {
        super(name, machineId, updateInterval);
        this.type = Type.QR_CODE;
        this.materialID = null;
        this.action = Action.valueOf(action);
        this.defect = false;
    }

    public Action getAction() {
        return action;
    }

    public void setMaterial(String id, boolean defect){
        this.setNewData(true);
        this.materialID = id;
        this.defect = defect;
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.materialID == null) {
            values.put("materialID", "null");
            values.put("action", "null");
            values.put("defect", "null");
        }
        else {
            values.put("materialID", this.materialID);
            values.put("action", this.action.name());
            values.put("defect", this.defect);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {}

}
