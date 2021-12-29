package Sensors;

import java.util.ArrayList;

public class VibrationSensor extends Sensor {

    Type type;
    float baseline;
    float baselineVariance;
    float posX;
    float posY;


    VibrationSensor(float positionX, float positionY) {
        super();
        this.type = Type.VIBRATION;
        this.posX = positionX;
        this.posY = positionY;
        this.baseline = 150; //Hz
        this.baselineVariance = (float) (this.baseline * 0.05); // 5% variation
    }

    @Override
    public void generateData() {

    }

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