package Sensors;

import java.util.ArrayList;

public class TemperatureSensor extends Sensor {

    Type type;
    float currentTemperature;

    // for generation of values
    float averageTemperature;
    float temperatureNormalDeviation;


    TemperatureSensor(float averageTemperature, float temperatureNormalDeviation, int updateInterval) {
        super(updateInterval);
        this.type = Type.TEMPERATURE;
        this.currentTemperature = 0; //ºC
        this.averageTemperature = averageTemperature;
        this.temperatureNormalDeviation = temperatureNormalDeviation;
    }

    @Override
    public void generateData() {

    }

    public ArrayList<Float> getData() {
        ArrayList<Float> temperature = new ArrayList<>();
        if (!this.isOn){
            temperature.add(null);
        }
        else {
            temperature.add(this.currentTemperature);
        }
        return temperature;
    }
}
