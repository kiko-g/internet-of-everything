package digitalModel;

import java.util.ArrayList;

public class VibrationSensor implements Sensor {

    digitalModel.Sensor.types type;
    float baseline;
    float baselineVariance;
    float posX;
    float posY;
    boolean on;


    VibrationSensor(float positionX, float positionY) {
        this.type = digitalModel.Sensor.types.VIBRATION;
        this.posX = positionX;
        this.posY = positionY;
        this.baseline = 150; //Hz
        this.baselineVariance = (float) (this.baseline * 0.05); // 5% variation
        this.on = true;

        this.baselineVariance = (float) (this.baseline * 0.05); // 5% variation
        this.on = true;
    }

    public void switchPower(){ this.on = !this.on;}

    public void switchOn(){ this.on = true;}

    public void switchOff(){ this.on = false;}

    public ArrayList<Float> getData() {
        ArrayList<Float> vibration = new ArrayList<>();
        if (!this.on){
            vibration.add((float) -1.0);
        }
        else {
            float random = (float) (-this.baselineVariance + Math.random() *  (this.baselineVariance + this.baselineVariance));
            vibration.add(this.baseline + random);
        }
        return vibration;
    }

    public void chaosUpSensor() {
        float up = (float) (this.baseline * 0.1); //ups the baseline 10%
        this.baseline += up;
    }

    public void chaosDownSensor() {
        float down = (float) (this.baseline * 0.1);
        this.baseline -= down;
    }    
}