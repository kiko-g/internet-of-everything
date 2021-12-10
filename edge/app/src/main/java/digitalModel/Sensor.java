package digitalModel;

import java.util.ArrayList;

public interface Sensor {

    public enum types {
        VIBRATION, TEMPERATURE, POSITION, SPEED
    }

    public void switchPower();
    public void switchOn();
    public void switchOff();
    public ArrayList<Float> getData();
    public void chaosUpSensor();
    public void chaosDownSensor();
}