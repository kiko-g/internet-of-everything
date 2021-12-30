package Sensors;

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

    public String getData() {
        if (!this.isOn) {

        }
        else {

        }
        return "";
    }

    @Override
    public void generateData() {
        System.out.println("Generate data " + this.getName());
    }
}
