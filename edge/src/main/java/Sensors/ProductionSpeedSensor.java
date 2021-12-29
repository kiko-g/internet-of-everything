package Sensors;

import java.util.ArrayList;

public class ProductionSpeedSensor extends Sensor {

    Type type;
    float currentSpeed;

    // for generation of values
    float averageSpeed;
    float speedNormalDeviation;


    ProductionSpeedSensor(float averageSpeed, float speedNormalDeviation, int updateInterval) {
        super(updateInterval);
        this.type = Type.PRODUCTION_SPEED;
        this.currentSpeed = 0; //antennas/min
        this.averageSpeed = averageSpeed;
        this.speedNormalDeviation = speedNormalDeviation;
    }


    public ArrayList<Float> getData() {
        ArrayList<Float> speed = new ArrayList<>();
        if (!this.isOn) {
            speed.add(null);
        }
        else {
            speed.add(this.currentSpeed);
        }
        return speed;
    }

    @Override
    public void generateData() {

    }
}
