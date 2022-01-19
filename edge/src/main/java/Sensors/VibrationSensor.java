package Sensors;

import org.json.JSONObject;
public class VibrationSensor extends Sensor {
    Type type;
    Double currentVibration;
    Double minimumVibration;
    Double maximumVibration;

    public VibrationSensor(String name, String machineId, double minimumVibration, double maximumVibration, double averageVibration, double vibrationStandardDeviation, double updateInterval) {
        super(name, machineId, averageVibration, vibrationStandardDeviation, updateInterval);
        this.type = Type.VIBRATION;
        this.minimumVibration = minimumVibration;
        this.maximumVibration = maximumVibration;
        this.currentVibration = null; // Hertz
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentVibration = null;
        else this.currentVibration = this.generateRandomDataNormalDistribution();

        this.setNewData(true);
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.currentVibration == null){
            values.put("vibration", "null");
        }
        else {
            values.put("vibration", this.currentVibration);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }
}