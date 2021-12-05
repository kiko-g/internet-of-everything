package ds.state;
import ds.listener.MachineListener;
import ds.listener.SubscribeCallback;

import java.util.*;

public class TemperatureState {
    private Queue<Float> temps;     // The last n temperatures.
    private Float tempSum;          // Sum of the temperatures.

    public TemperatureState(){
        this.temps= new LinkedList<>();
    }

    /**
     * This function adds a new temperature to the queue.
     * If the queue is full, the oldest temperature log will be droped and a the new one will be added to the end of the
     * queue.
     * @param newTemp The new temperature to be added to the queue.
     */
    public void add(Float newTemp){ 
        int currSize = temps.size(); 
        if (currSize < SubscribeCallback.INFO_SIZE){
            temps.add(newTemp);
            tempSum += newTemp;
        } else {
            Float removedTemp = temps.remove();     // removes the first element.
            temps.add(newTemp);
            tempSum = tempSum - removedTemp + newTemp; 
        }
    }

    /**
     * Get's the mean temperature of the machine considering the last n.
     * @return The temperature mean.
     */
    public Float getMeanTemp(){
        return tempSum / temps.size(); 
    } 

}