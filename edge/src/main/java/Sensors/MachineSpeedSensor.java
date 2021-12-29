package Sensors;

import java.util.ArrayList;

public class MachineSpeedSensor extends Sensor {

    MachineSpeedSensor(String name, int updateInterval) {
        super(name, updateInterval);
    }

    @Override
    public void generateData() {

    }

    @Override
    public ArrayList<Float> getData() {
        return null;
    }
}
