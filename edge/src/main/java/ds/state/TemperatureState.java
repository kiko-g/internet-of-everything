package ds.state;
import java.util.*;

public class TemperatureState {
    private Queue<Float> temps;     // The last "size" temperatures. 
    private Integer size;           // Max size of the queue. 
    private Float tempSum;          // Sum of the temperatures in temps. 

    public TemperatureState(Integer size){
        this.temps= new LinkedList<>();
        this.size = size; 
    } 

    public void add(Float newTemp){ 
        int currSize = temps.size(); 
        if (currSize < size){
            temps.add(newTemp);
            tempSum += newTemp;
        } else {
            Float removedTemp = temps.remove();     // removes the first element.
            temps.add(newTemp);
            tempSum = tempSum - removedTemp + newTemp; 
        }
    }

    public Float getMeanTemp(){
        return tempSum / temps.size(); 
    } 

}