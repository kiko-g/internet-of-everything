package Sensors;

import java.util.ArrayList;

public class ProductionSpeedSensor extends Sensor {
    Type type;
    Double currentSpeed;

    public ProductionSpeedSensor(String name, double averageSpeed, double speedStandardDeviation, int updateInterval) {
        super(name, averageSpeed, speedStandardDeviation, updateInterval);
        this.type = Type.PRODUCTION_SPEED;
        this.currentSpeed = null; //antennas/min
    }

    public String getData() {
        ArrayList<Double> speed = new ArrayList<>();
        if (!this.isOn) {
            speed.add(null);
        }
        else {
            speed.add(this.currentSpeed);
        }
        return "";
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentSpeed = null;
        else this.currentSpeed = this.generateRandomDataNormalDistribution();
    }
}
