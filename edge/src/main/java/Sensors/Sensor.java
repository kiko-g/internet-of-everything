package Sensors;

import java.util.ArrayList;

public abstract class Sensor {

    boolean on;

    Sensor(){
        this.on = true;
    }

    public enum Type {
        VIBRATION, TEMPERATURE, POSITION, PRODUCTION_SPEED
    }

    public void switchPower(){ this.on = !on;}

    public void switchOn(){ this.on = true;}

    public void switchOff(){ this.on = false;}

    public abstract void generateData();
    public abstract ArrayList<Float> getData();
}