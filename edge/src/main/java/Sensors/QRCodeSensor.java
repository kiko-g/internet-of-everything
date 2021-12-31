package Sensors;
import org.json.JSONObject;
public class QRCodeSensor extends Sensor {
    Type type;
    int materialID;
    int defectProbability;

    public QRCodeSensor(String name, int defectProbability, int updateInterval) {
        super(name, updateInterval);
        this.type = Type.QR_CODE;
        this.materialID = 0;
        this.defectProbability = defectProbability;
    }

    public JSONObject getData() {
        JSONObject obj = createJSON("MachineID", this.id, String.valueOf(this.type));
        JSONObject values = new JSONObject();
        if (!this.isOn) {
            values.put("QRcode", "null");
        }
        else {
            this.generateData();
            values.put("QRcode", this.materialID);
        }
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        System.out.println("Generate data " + this.getName());
    }
}
