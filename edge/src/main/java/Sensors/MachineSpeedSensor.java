package Sensors;

import java.util.ArrayList;

public class MachineSpeedSensor extends Sensor {
    Type type;
    Double currentSpeed;

    public MachineSpeedSensor(String name, double averageSpeed, double speedStandardDeviation, int updateInterval) {
        super(name, averageSpeed, speedStandardDeviation, updateInterval);
        this.type = Type.MACHINE_SPEED;
        this.currentSpeed = null; // meters/s
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
        // do nothing, for now machines are static
    }
}
