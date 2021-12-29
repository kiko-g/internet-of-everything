package Sensors;

import java.util.ArrayList;

public class VibrationSensor extends Sensor {

    Type type;
    float currentVibration;

    // for generation of values
    float averageVibration;
    float vibrationNormalDeviation;


    public VibrationSensor(String name, float averageVibration, float vibrationNormalDeviation, int updateInterval) {
        super(name, updateInterval);
        this.type = Type.VIBRATION;
        this.currentVibration = 0; //Hz
        this.averageVibration = averageVibration;
        this.vibrationNormalDeviation = vibrationNormalDeviation;
    }

    @Override
    public void generateData() {
        System.out.println("Generate data " + this.getName());
    }

    public ArrayList<Float> getData() {
        ArrayList<Float> vibration = new ArrayList<>();
        if (!this.isOn){
            vibration.add(null);
        }
        else {
            vibration.add(this.currentVibration);
        }
        return vibration;
    }
}