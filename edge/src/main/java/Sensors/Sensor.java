package Sensors;

import org.json.JSONObject;

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
    public abstract JSONObject getData();

    public JSONObject createJSON(String machineID, String sensorID, String sensorType, double... values) {
        JSONObject obj = new JSONObject();
        obj.put("machineID", machineID);
        obj.put("sensorID", sensorID);
        obj.put("sensorType", sensorType);
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