package Sensors;

import java.util.ArrayList;
import java.util.Random;
import org.json.JSONObject;

public class EnergySensor extends Sensor {
    Type type;
    Double currentEnergy;

    public EnergySensor(String name, float averageEnergy, float energyStandardDeviation, int updateInterval) {
        super(name, averageEnergy, energyStandardDeviation, updateInterval);
        this.type = Type.ENERGY;
        this.currentEnergy = null; // Watt
    }

    public JSONObject getData() {
        JSONObject obj = new JSONObject();
        if (!this.isOn) {
            obj.put("value", "null");
        }
        else {
            this.generateData();
            obj.put("value", this.currentEnergy);
        }
        return obj;
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentEnergy = null;
        else this.currentEnergy = this.generateRandomDataNormalDistribution();
    }
}
