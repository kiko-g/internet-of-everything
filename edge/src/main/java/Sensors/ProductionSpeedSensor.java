package Sensors;

import org.json.JSONObject;

public class ProductionSpeedSensor extends Sensor {
    Type type;
    Double currentSpeed;
    Double prodSpeedMin;
    Double prodSpeedMax;

    public ProductionSpeedSensor(String name, String machineId, double prodSpeedMin, double prodSpeedMax, double averageSpeed, double speedStandardDeviation, double updateInterval) {
        super(name, machineId, averageSpeed, speedStandardDeviation, updateInterval);
        this.type = Type.PRODUCTION_SPEED;
        this.prodSpeedMin = prodSpeedMin;
        this.prodSpeedMax = prodSpeedMax;
        this.currentSpeed = null; //antennas/min
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.currentSpeed == null) {
            values.put("productionSpeed", "null");
        }
        else {
            values.put("productionSpeed", this.currentSpeed);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentSpeed = null;
        else this.currentSpeed = this.generateRandomDataNormalDistribution();

        this.setNewData(true);
    }
}
