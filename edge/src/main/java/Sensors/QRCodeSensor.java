package Sensors;
import org.json.JSONObject;
public class QRCodeSensor extends Sensor {
    enum Action {IN, OUT}

    Type type;
    Integer materialID;
    Action action;
    boolean defect;

    public QRCodeSensor(String name, String machineId, String action, double updateInterval) {
        super(name, machineId, updateInterval);
        this.type = Type.QR_CODE;
        this.materialID = null;
        this.action = Action.valueOf(action);
        this.defect = false;
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
    public void generateData() {
        //System.err.println("Generate of data " + this.getName() + " not implemented.");
    }
}
