package digitalModel;

import java.util.ArrayList;

public class PositionSensor implements Sensor{

    digitalModel.Sensor.types type;
    float baselineVarianceY;
    float baselineVarianceX;
    float posX;
    float posY;
    boolean on;


    PositionSensor(float positionX, float positionY) {
        this.type = digitalModel.Sensor.types.VIBRATION;
        this.posX = positionX;
        this.posY = positionY;
        this.baselineVarianceX = (float) (this.posX * 0.05); // 5% variation
        this.baselineVarianceY = (float) (this.posY * 0.05);
        this.on = true;
    }

    public void switchPower(){ this.on = !this.on;}

    public void switchOn(){ this.on = true;}

    public void switchOff(){ this.on = false;}

    public ArrayList<Float> getData() {
        //should have a configuration file with paths??
        //for now, dummy movements:
        ArrayList<Float> position = new ArrayList<>();
        if (!this.on){
            position.add(-1.0f);
            position.add(-1.0f);
        }
        else {
            float random = (float) Math.random();
            if (random > 0.8){
                position.add(this.posX + this.baselineVarianceX);
                position.add(this.posY);
            }
            else {
                position.add(this.posX);
                position.add(this.baselineVarianceY + this.posY);
            }
        }
        return position;
    }

    public void chaosUpSensor() {
        this.posX = 2 * this.posX;
        this.posY = 2 * this.posY;
    }

    public void chaosDownSensor() {
        this.posX = 0;
        this.posY = 0;
    }
}
