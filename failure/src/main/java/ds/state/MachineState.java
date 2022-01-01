package ds.state;

import ds.graph.sensor.Sensor;
import ds.state.sensor.SensorState;

import java.util.concurrent.ConcurrentHashMap;
public class MachineState  {
    private String id;                                          
    ConcurrentHashMap<String, SensorState> sensorsState;        // (sensorId, SensorState Class)

    public MachineState(String id, ConcurrentHashMap<String, Sensor> sensors){
        this.id = id;
        this.sensorsState = new ConcurrentHashMap<>();
        this.initSensorState(sensors);
    } 

    private void initSensorState(ConcurrentHashMap<String, Sensor> sensors){
        sensors.forEach((key, sensor) -> {
            sensorsState.put(key, new SensorState(sensor));
        }); 
    }

    public String getId() {
        return id;
    }

    /**
     * Function resposible for returning the current state of a sensor. 
     * @param sensorId The sensor id. 
     * @return The class contaning the current state of a sensor. 
     */
    public SensorState getSensorState(String sensorId){
        return this.sensorsState.get(sensorId);
    }

    public void updateSensorState(String sensorId, String propertyName, float value){

    }

    @Override
    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        builder.append("[MACHINE STATE] ").append(this.id).append("\n");
        this.sensorsState.forEach((id, sensor) -> {
            builder.append(sensor.toString()); 
        });
        return builder.toString();
    }

    

}