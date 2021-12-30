package Sensors;

import java.util.ArrayList;

public class MachineDirectionSensor extends Sensor {
    Type type;
    Double currentDirection;

    public MachineDirectionSensor(String name, double averageDirection, double directionStandardDeviation, int updateInterval) {
        super(name, averageDirection, directionStandardDeviation, updateInterval);
        this.type = Type.MACHINE_DIRECTION;
        this.currentDirection = null; // degrees
    }

    public String getData() {
        ArrayList<Double> speed = new ArrayList<>();
        if (!this.isOn) {
            speed.add(null);
        }
        else {
            speed.add(this.currentDirection);
        }
        return "";
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }
}
