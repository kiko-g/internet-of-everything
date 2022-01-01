package ds.state;

import ds.graph.sensor.Sensor;

import java.util.concurrent.ConcurrentHashMap;
public class MachineState  {
    private String id;  
    private TemperatureState tempState;
    ConcurrentHashMap<String, Sensor> sensors; 


    public MachineState(String id, ConcurrentHashMap<String, Sensor> sensors){
        this.id = id;
        this.sensors = sensors;
    }

    public TemperatureState getTempState(){
        return this.tempState;
    }

    public void addTemperature(float temperature){
        this.tempState.add(temperature);
    }

    public String getId() {
        return id;
    }

    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        builder.append("== MACHINE STATE:").append(this.id).append("\n");
        sensors.forEach((id, sensor) -> {
            builder.append(sensor.toString()); 
        });
        return builder.toString();
    }

}