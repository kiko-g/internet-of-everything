package ds.state.sensor;

import ds.graph.sensor.Sensor;
import ds.graph.sensor.Values;
import java.util.concurrent.ConcurrentHashMap;

public class SensorState{
    ConcurrentHashMap<String, MeasureState> measureStates;  

    public SensorState(Sensor sensor){
        this.measureStates = new ConcurrentHashMap<>();
        this.initMeasureStates(sensor);
    }
    
    // TODO: add max and min values of sensor measures.
    private void initMeasureStates(Sensor sensor){
        ConcurrentHashMap<String, Values> measureBounds = sensor.getValues(); 
        measureBounds.forEach((key, values)-> {
            this.measureStates.put(key, new MeasureState()); 
        });
    }

    public MeasureState getMeasureState(String measureType){
        return measureStates.get(measureType);
    }

    // TODO false if measure is not inside bounds.
    public void updateMeasureState(String measureType, float newMeasure){
        MeasureState measureState = this.measureStates.get(measureType); 
        measureState.add(newMeasure);
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