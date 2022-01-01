package ds.state.sensor;

import java.util.*;
import ds.listener.MachineListener;

/**
 * This class stores and calculates statistics about a given sensor measure.
 * Example:
 * The position sensor contains two measures: the position x and the position y.
 * The MeasureState stores one of these types of measure and calculates its
 * statistics.
 */
public class MeasureState {
    Queue<Float> lastMeasures; // The last n values.
    float sumMeasures; // The total sum of the values in the queue.
    float mostRecentMeasure; 

    Integer nMeasuresUntilNow;          // The number of measures received until now; 
    Integer nFailedMeasuresUntilNow;    // The number of measures failed until now. 

    public MeasureState() {
        this.lastMeasures = new LinkedList<>();
        this.sumMeasures = 0;
        this.nMeasuresUntilNow = 0;
    } 

    /**
     * Get's the mean temperature of the machine considering the last n.
     * 
     * @return The temperature mean.
     */
    public Float getMeanMeasure() {
        return sumMeasures/ lastMeasures.size();
    }

    public Float getMostRecentMeasures() {
        return this.mostRecentMeasure;
    }

    // TODO - return true or false case the sensor measure has been added. 
    /**
     * This function adds a new values to the queue.
     * If the queue is full, the oldest temperature log will be droped and a the new
     * one will be added to the end of the
     * queue.
     * 
     * @param newTemp The new temperature to be added to the queue.
     */
    public void add(float newMeasure) {
        int numMeasures = this.lastMeasures.size();
        this.nMeasuresUntilNow++;
        if (numMeasures < MachineListener.INFO_SIZE) {
            this.lastMeasures.add(newMeasure);
            this.sumMeasures += newMeasure;
        } else {
            Float removedMeasure = this.lastMeasures.remove(); // Remove the first element in the queue.
            this.lastMeasures.add(newMeasure);
            this.sumMeasures = this.sumMeasures - removedMeasure + newMeasure;
        }
        this.mostRecentMeasure = newMeasure;
    }


    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        builder.append("- sumMeasures: ").append(this.sumMeasures).append("\n");
        builder.append("- mostRecentMeasure: ").append(this.mostRecentMeasure).append("\n");
        builder.append("- nMeasuresUntilNow: ").append(this.nMeasuresUntilNow).append("\n");
        return builder.toString();
    }
}
