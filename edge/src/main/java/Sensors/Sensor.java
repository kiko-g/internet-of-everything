package Sensors;

import org.json.JSONObject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public abstract class Sensor extends Thread {

    String id;
    String machineId;
    boolean isOn;
    boolean newData;
    double interval; // update interval in milliseconds
    static int ERROR_PROBABILITY = 10; // %

    // for generation of data
    double averageValue;
    double standardDeviation;
    Random random;

    public enum Type {
        POSITION,
        VELOCITY,
        MACHINE_DIRECTION,
        TEMPERATURE,
        VIBRATION,
        PRODUCTION_SPEED,
        ENERGY,
        QR_CODE
    }

    Sensor(String id, String machineId, double updateInterval) {
        this.setName(id);
        this.id = id;
        this.machineId = machineId;
        this.isOn = true;
        this.newData = false;
        this.interval = updateInterval;
    }

    Sensor(String id, String machineId, double averageValue, double standardDeviation, double updateInterval) {
        this.setName(id);
        this.id = id;
        this.machineId = machineId;
        this.isOn = true;
        this.interval = updateInterval;
        this.averageValue = averageValue;
        this.standardDeviation = standardDeviation;
        this.random = new Random();
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

    public void setNewData(boolean newData) {
        this.newData = newData;
    }

    public boolean hasNewData() {
        return this.newData;
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
    public abstract JSONObject readData();

    public JSONObject createBaseJSON() {
        JSONObject obj = new JSONObject();
        //prepare reading time
        String readingTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss.SSSSSS"));
        obj.put("machineID", this.machineId);
        obj.put("sensorID", this.id);
        obj.put("readingTime", readingTime);
        return obj;
    }
}
        /*                       Message format to send to machine
        {
        "machineID": String,         # Unique identifier of each machine
        "sensorID": String,          # Unique identifier of each sensor
        "sensorType": String,        # Type of the sensor
        "values": [                  # Values read by the sensor
        "valueName1": float,
        "valueName2": float,
        (...)
        "valueNameN": float,
        ],
        "readingTime": datetime(mmhhYYYYMMDD)      # Time of the reading
        }
        */