package Sensors;

import java.util.ArrayList;

public class TemperatureSensor extends Sensor {
    Type type;
    Double currentTemperature;

    public TemperatureSensor(String name, double averageTemperature, double temperatureStandardDeviation, int updateInterval) {
        super(name, averageTemperature, temperatureStandardDeviation, updateInterval);
        this.type = Type.TEMPERATURE;
        this.currentTemperature = null; //ºC
    }

    @Override
    public void generateData() {
        if(Math.random() * 100 < ERROR_PROBABILITY)
            this.currentTemperature = null;
        else this.currentTemperature = this.generateRandomDataNormalDistribution();
    }

    public String getData() {
        ArrayList<Double> temperature = new ArrayList<>();
        if (!this.isOn){
            temperature.add(null);
        }
        else {
            temperature.add(this.currentTemperature);
        }
        return "";
    }
}
