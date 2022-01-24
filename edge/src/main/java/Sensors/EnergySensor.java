package Sensors;

import org.json.JSONObject;

public class EnergySensor extends Sensor {
    Type type;
    Double currentEnergy;
    Double energyMin;
    Double energyMax;

    public EnergySensor(String name, String machineId, double energyMin, double energyMax, float averageEnergy, float energyStandardDeviation, double updateInterval) {
        super(name, machineId, averageEnergy, energyStandardDeviation, updateInterval);
        this.type = Type.ENERGY;
        this.energyMin = energyMin;
        this.energyMax = energyMax;
        this.currentEnergy = null; // Watt
    }

    public JSONObject readData() {
        this.setNewData(false);

        JSONObject values = new JSONObject();
        if (!this.isOn || this.currentEnergy == null) {
            values.put("energy", "null");
        }
        else {
            values.put("energy", this.currentEnergy);
        }

        JSONObject obj = createBaseJSON();
        obj.put("values", values);
        return obj;
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentEnergy = null;
        else this.currentEnergy = this.generateRandomDataNormalDistribution();

        this.setNewData(true);
    }
}
