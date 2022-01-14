package ds.state;

import ds.graph.sensor.Sensor;
import ds.state.sensor.SensorState;

import java.util.concurrent.ConcurrentHashMap;

/**
 * This class is resposible for administrating the machine state and its sensors. 
 */
public class MachineState  {
    private String id;                                          
    private ConcurrentHashMap<String, SensorState> sensorsState;        // (sensorId, SensorState Class)

    public MachineState(String id, ConcurrentHashMap<String, Sensor> sensors){
        this.id = id;
        this.sensorsState = new ConcurrentHashMap<>();
        this.initSensorState(sensors);
    } 
    /**
     * Initializes teh sensorsState. 
     * @param sensors HashMap containing the machine sensors id as key and its configurations as value. 
     */
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

    public void updateSensorState(String sensorId, String propertyName, double value){

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