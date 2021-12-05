package ds.state;

import org.json.simple.JSONObject;

public class MachineState  {

    private String id;  
    private TemperatureState tempState;

    public MachineState(JSONObject messageParsed){
        this.id = messageParsed.get("machineID").toString();
        this.tempState = new TemperatureState();
        this.tempState.add(Float.parseFloat(messageParsed.get("temperature").toString()));
    }

    public TemperatureState getTempState(){
        return this.tempState;
    }

    public void addTemperature(Float temperature){
        this.tempState.add(temperature);
    }

    public String getId() {
        return id;
    }
}