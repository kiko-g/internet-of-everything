package Sensors;

import java.util.ArrayList;

public abstract class Sensor extends Thread {

    String id;
    boolean isOn;
    int interval; // update interval in milliseconds
    int ERROR_PROBABILITY = 10; // %

    public enum Type {
        POSITION,
        MACHINE_SPEED,
        MACHINE_DIRECTION,
        TEMPERATURE,
        VIBRATION,
        PRODUCTION_SPEED,
        ENERGY,
        QR_CODE
    }

    Sensor(String id, int updateInterval) {
        this.setName(id);
        this.id = id;
        this.isOn = true;
        this.interval = updateInterval;
    }

    public String getID() {
        return this.id;
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
        System.out.println("Sensor " + this.id + " started to run.");
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