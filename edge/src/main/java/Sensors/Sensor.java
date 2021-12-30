package Sensors;

import java.util.Random;

public abstract class Sensor extends Thread {

    String id;
    boolean isOn;
    int interval; // update interval in milliseconds
    static int ERROR_PROBABILITY = 10; // %

    // for generation of data
    double averageValue;
    double standardDeviation;
    Random random;

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

    Sensor(String id, double averageValue, double standardDeviation, int updateInterval) {
        this.setName(id);
        this.id = id;
        this.isOn = true;
        this.interval = updateInterval;
        this.averageValue = averageValue;
        this.standardDeviation = standardDeviation;
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

    public double generateRandomDataNormalDistribution() {
        return random.nextGaussian() * this.standardDeviation + this.averageValue;
    }

    public abstract void generateData();
    public abstract String getData();
}