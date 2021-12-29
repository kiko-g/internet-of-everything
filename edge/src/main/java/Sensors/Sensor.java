package Sensors;

import java.util.ArrayList;

public abstract class Sensor implements Runnable {

    boolean isOn;
    int interval; //update interval in milliseconds

    public enum Type {
        VIBRATION, TEMPERATURE, POSITION, PRODUCTION_SPEED
    }

    Sensor(int updateInterval) {
        this.isOn = true;
        this.interval = updateInterval;
    }

    public void switchPower() {
        this.isOn = !isOn;
    }

    public void switchOn() {
        this.isOn = true;
    }

    public void switchOff() {
        this.isOn = false;
    }

    public void run() {
        long lastExecution = System.currentTimeMillis();
        while (this.isOn){
            if((System.currentTimeMillis() - lastExecution) >= this.interval){
                this.generateData();
                lastExecution = System.currentTimeMillis();
            }
        }
    }

    public abstract void generateData();
    public abstract ArrayList<Float> getData();
}