package Sensors;

import java.util.ArrayList;

public class PositionSensor extends Sensor {

    Type type;
    float posX;
    float posY;

    public PositionSensor(float positionX, float positionY, int updateInterval) {
        super(updateInterval);
        this.type = Type.POSITION;
        this.posX = positionX;
        this.posY = positionY;
    }

    @Override
    public void generateData() {

    }

    public ArrayList<Float> getData() {
        //should have a configuration file with paths??
        //for now, dummy movements:
        ArrayList<Float> position = new ArrayList<>();
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
        return position;
    }
}
