package Sensors;

import java.util.ArrayList;

public class VibrationSensor extends Sensor {

    Type type;
    float currentVibration;

    // for generation of values
    float averageVibration;
    float vibrationNormalDeviation;


    VibrationSensor(float averageVibration, float vibrationNormalDeviation) {
        super();
        this.type = Type.VIBRATION;
        this.currentVibration = 150; //Hz
        this.averageVibration = averageVibration;
        this.vibrationNormalDeviation = vibrationNormalDeviation;
    }

    @Override
    public void generateData() {

    }

    public ArrayList<Float> getData() {
        ArrayList<Float> vibration = new ArrayList<>();
        if (!this.on){
            vibration.add(null);
        }
        else {
            vibration.add(this.currentVibration);
        }
        return vibration;
    }
}