package Sensors;

import java.util.ArrayList;

public class ProductionSpeedSensor extends Sensor {

    Type type;
    float currentSpeed;

    // for generation of values
    float averageSpeed;
    float speedNormalDeviation;


    ProductionSpeedSensor(float averageSpeed, float speedNormalDeviation) {
        super();
        this.type = Type.PRODUCTION_SPEED;
        this.currentSpeed = 0; //antennas/min
        this.averageSpeed = averageSpeed;
        this.speedNormalDeviation = speedNormalDeviation;
    }

    @Override
    public void generateData() {

    }

    public ArrayList<Float> getData() {
        ArrayList<Float> speed = new ArrayList<>();
        if (!this.on) {
            speed.add(null);
        }
        else {
            speed.add(this.currentSpeed);
        }
        return speed;
    }
}
