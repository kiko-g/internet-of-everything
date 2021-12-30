package Sensors;

import java.util.ArrayList;
import java.util.Random;

public class EnergySensor extends Sensor {
    Type type;
    Double currentEnergy;

    public EnergySensor(String name, float averageEnergy, float energyStandardDeviation, int updateInterval) {
        super(name, averageEnergy, energyStandardDeviation, updateInterval);
        this.type = Type.ENERGY;
        this.currentEnergy = null; // Watt
    }

    public String getData() {
        ArrayList<Double> speed = new ArrayList<>();
        if (!this.isOn) {
            speed.add(null);
        }
        else {
            speed.add(this.currentEnergy);
        }
        return "";
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentEnergy = null;
        else this.currentEnergy = this.generateRandomDataNormalDistribution();
    }
}
