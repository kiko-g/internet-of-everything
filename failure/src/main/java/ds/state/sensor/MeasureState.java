package ds.state.sensor;

import ds.listener.MachineListener;
import ds.graph.sensor.Values;
import java.util.*;


/**
 * This class stores and calculates statistics about a given sensor measure.
 * Example:
 * The position sensor contains two measures: the position x and the position y.
 * The MeasureState stores one of these types of measure and calculates its
 * statistics.
 */
public class MeasureState {
    private Queue<Double> lastMeasures;          // The last n values.
    private double sumMeasures;                  // The total sum of the values in the queue.
    private double mostRecentMeasure; 

    private Integer nMeasures;                  // The number of measures received until now.
    private Integer nUnallowedMeasures;         // The number of measures not allowed until now (i.e measure not within the min and max bounds).

    private Values expectedValues;              // The expected values for a sensor.

    public MeasureState(Values values) {
        this.expectedValues = values;
        this.lastMeasures = new LinkedList<>();
        this.sumMeasures = 0;
        this.nMeasures = 0;
        this.nUnallowedMeasures = 0;
    } 

    /**
     * Get's the mean value of the machine considering the last n.
     * @return The value mean.
     */
    public Double getMeanMeasure() {
        return sumMeasures/ lastMeasures.size();
    }

    public Double getMostRecentMeasures() {
        return this.mostRecentMeasure;
    }

    public Values getExpectedValues(){
        return this.expectedValues;
    }

    public Queue<Double> getLastMeasures() {
        return lastMeasures;
    }

    public Double getMaxProximity() {
        return this.expectedValues.max - this.mostRecentMeasure;
    }

    public Double getMinProximity() {
        return this.mostRecentMeasure - this.expectedValues.min;
    }

    private void updateUnallowedMeasures(double measure){
        this.nUnallowedMeasures += this.isMeasureAcceptable(measure) ? 1: 0; 
    }

    /**
     * This function adds a new values to the queue.
     * If the queue is full, the oldest value log will be droped and a the new
     * one will be added to the end of the
     * queue.
     * 
     * @param newMeasure The new measure to be added to the queue.
     */
    public boolean add(double newMeasure) {
        int numMeasures = this.lastMeasures.size();
        this.nMeasures++;
        if (numMeasures < MachineListener.INFO_SIZE) {
            this.lastMeasures.add(newMeasure);
            this.sumMeasures += newMeasure;
        } else {
            Double removedMeasure = this.lastMeasures.remove(); // Remove the first element in the queue.
            this.lastMeasures.add(newMeasure);
            this.sumMeasures = this.sumMeasures - removedMeasure + newMeasure;
        }
        this.mostRecentMeasure = newMeasure;
        updateUnallowedMeasures(newMeasure);
        return isMeasureAcceptable(newMeasure); 
    }

    /**
     * An acceptable measure is a measure that is between its possible min and max values. 
     * @return true if the measure is acceptable, false otherwise. 
     */
    private boolean isMeasureAcceptable(double measureValue){
        return measureValue >= this.expectedValues.getMin() && measureValue <= this.expectedValues.max;
    }

    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        builder.append("- sumMeasures: ").append(this.sumMeasures).append("\n");
        builder.append("- mostRecentMeasure: ").append(this.mostRecentMeasure).append("\n");
        builder.append("- nMeasures: ").append(this.nMeasures).append("\n");
        return builder.toString();
    }
}
