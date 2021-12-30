package Sensors;

import java.util.ArrayList;

public class PositionSensor extends Sensor {
    Type type;
    Double posX;
    Double posY;

    public PositionSensor(String name, double positionX, double positionY, int updateInterval) {
        super(name, updateInterval);
        this.type = Type.POSITION;
        this.posX = positionX;
        this.posY = positionY;
    }

    @Override
    public void generateData() {
        // do nothing, for now machines are static
    }

    public String getData() {
        //should have a configuration file with paths??
        //for now, dummy movements:
        ArrayList<Double> position = new ArrayList<>();
        if (!this.isOn){
            position.add(null);
            position.add(null);
        }
        else {
            float random = (float) Math.random();
            if (random > 0.8){
                position.add(this.posY);
            }
            else {
                position.add(this.posX);
            }
        }
        return "";
    }
}
