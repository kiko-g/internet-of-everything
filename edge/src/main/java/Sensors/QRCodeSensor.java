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
        JSONObject obj = new JSONObject();
        if (!this.isOn) {
            obj.put("value", "null");
        }
        else {
            this.generateData();
            obj.put("value", this.materialID);
        }
        return obj;
    }

    @Override
    public void generateData() {
        System.out.println("Generate data " + this.getName());
    }
}
