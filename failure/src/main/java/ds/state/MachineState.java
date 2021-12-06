package ds.state;

import org.json.JSONObject;

public class MachineState  {
    private String id;  
    private TemperatureState tempState;

    public MachineState(JSONObject messageParsed){
        this.id = messageParsed.getString("machineID");
        this.tempState = new TemperatureState();
        this.tempState.add(messageParsed.getJSONObject("properties").getFloat("temperature"));
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