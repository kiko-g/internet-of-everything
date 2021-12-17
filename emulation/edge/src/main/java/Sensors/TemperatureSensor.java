package Sensors;

import java.util.ArrayList;

public class TemperatureSensor implements Sensor{

    Type type;
    float baseline;
    float baselineVariance;
    float posX;
    float posY;
    boolean on;


    TemperatureSensor(float positionX, float positionY) {
        this.type = Type.VIBRATION;
        this.posX = positionX;
        this.posY = positionY;
        this.baseline = 40; //ºC
        this.baselineVariance = (float) (this.baseline * 0.05); // 5% variation
        this.on = true;
    }

    public void switchPower(){ this.on = !this.on;}

    public void switchOn(){ this.on = true;}

    public void switchOff(){ this.on = false;}

    public ArrayList<Float> getData() {
        if (!this.on) return (float) -1.0;
        else {
            float random = (float) (-this.baselineVariance + Math.random() *  (this.baselineVariance + this.baselineVariance));
            return this.baseline + random;
        }
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
