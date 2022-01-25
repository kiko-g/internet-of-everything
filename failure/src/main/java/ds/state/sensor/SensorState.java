package ds.state.sensor;

import ds.graph.sensor.Sensor;
import ds.graph.sensor.Values;
import java.util.concurrent.ConcurrentHashMap;

public class SensorState{
    private ConcurrentHashMap<String, MeasureState> measureStates;
    private String id; 

    public SensorState(Sensor sensor){
        this.id = sensor.getId();
        this.measureStates = new ConcurrentHashMap<>();
        this.initMeasureStates(sensor);
    }
    
    private void initMeasureStates(Sensor sensor){
        ConcurrentHashMap<String, Values> measureBounds = sensor.getValues(); 
        measureBounds.forEach((key, values)-> {
            this.measureStates.put(key, new MeasureState(values)); 
        });
    }

    public String getId(){
        return this.id;
    }
    
    public MeasureState getMeasureState(String measureType){
        return measureStates.get(measureType);
    }

    public boolean findMeasureState(String measureType){
        return measureStates.containsKey(measureType);
    }

    /**
     * Updates the sensor state by adding a new measure to it. 
     * @param measureType The type of measure (e.g, temperature, vibration) 
     * @param newMeasure The measure value. 
     * @return True if the measure is between the min and max values allowed. False otherwise. 
     */
    public boolean updateMeasureState(String measureType, double newMeasure){
        MeasureState measureState = this.measureStates.get(measureType); 
        return measureState.add(newMeasure);
    }

    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        this.measureStates.forEach((key, values)-> {
            builder.append("[").append(key).append("] ").append("\n");
            builder.append(values).append("\n");
        });
        return builder.toString();
    }
}