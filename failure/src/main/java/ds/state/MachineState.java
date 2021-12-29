package ds.state;

import java.util.concurrent.ConcurrentHashMap;

public class MachineState  {
    private String id;  
    private TemperatureState tempState;

    public MachineState(String id, ConcurrentHashMap<String, Float> defaultValues){
        this.id = id;
        float tempDefault = defaultValues.get("temperature").floatValue();
        this.tempState = new TemperatureState(tempDefault);
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
}