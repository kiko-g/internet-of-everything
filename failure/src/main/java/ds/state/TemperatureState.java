package ds.state;
import ds.listener.MachineListener;

import java.util.*;

public class TemperatureState {
    private Queue<Float> temps;     // The last n temperatures.
    private float tempSum;          // Sum of the temperatures.
    private float maxTemp;
    private float currentTemp;

    public TemperatureState(float maxTemp){
        this.temps= new LinkedList<>();
        this.maxTemp = maxTemp;
        this.currentTemp = maxTemp;
        this.tempSum = 0;
    }

    /**
     * This function adds a new temperature to the queue.
     * If the queue is full, the oldest temperature log will be droped and a the new one will be added to the end of the
     * queue.
     * @param newTemp The new temperature to be added to the queue.
     */
    public void add(float newTemp){ 
        int currSize = this.temps.size(); 

        if (currSize < MachineListener.INFO_SIZE){
            this.temps.add(Float.valueOf(newTemp));
            this.tempSum += newTemp;
        } else {
            Float removedTemp = this.temps.remove();     // removes the first element.
            this.temps.add(Float.valueOf(newTemp));
            this.tempSum = this.tempSum - removedTemp + newTemp; 
        }
        this.currentTemp = newTemp;
    }

    /**
     * Get's the mean temperature of the machine considering the last n.
     * @return The temperature mean.
     */
    public Float getMeanTemp(){
        return tempSum / temps.size(); 
    } 

    public Float getCurrentTemp() {
        return this.currentTemp;
    }
    
    public Queue<Float> getTempQueue() {
        return temps;
    }

    public Float getMaxTemp() {
        return this.maxTemp;
    }
}