package Sensors;

import org.json.JSONObject;
public class TemperatureSensor extends Sensor {
    Type type;
    Double currentTemperature;
    Double tempMin;
    Double tempMax;

    public TemperatureSensor(String name, String machineId, double tempMin, double tempMax, double averageTemperature, double temperatureStandardDeviation, double updateInterval) {
        super(name, machineId, averageTemperature, temperatureStandardDeviation, updateInterval);
        this.type = Type.TEMPERATURE;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.currentTemperature = null; //ºC
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentTemperature = null;
        else this.currentTemperature = this.generateRandomDataNormalDistribution();

        this.setNewData(true);
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.currentTemperature == null) {
            values.put("temperature", "null");
        }
        else {
            values.put("temperature", this.currentTemperature);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }
}
