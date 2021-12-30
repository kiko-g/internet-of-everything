package Sensors;

import java.util.ArrayList;

public class VibrationSensor extends Sensor {
    Type type;
    Double currentVibration;

    public VibrationSensor(String name, double averageVibration, double vibrationStandardDeviation, int updateInterval) {
        super(name, averageVibration, vibrationStandardDeviation, updateInterval);
        this.type = Type.VIBRATION;
        this.currentVibration = null; // Hertz
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentVibration = null;
        else this.currentVibration = this.generateRandomDataNormalDistribution();
    }

    public String getData() {
        ArrayList<Double> vibration = new ArrayList<>();
        if (!this.isOn){
            vibration.add(null);
        }
        else {
            vibration.add(this.currentVibration);
        }
        return "";
    }
}