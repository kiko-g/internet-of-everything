package ds.state;
public class MachineState  {

    private String id;  
    private Integer size; 
    private TemperatureState tempState;

    public MachineState(Integer size, String id){ 
        this.tempState = new TemperatureState(size);  
        this.id = id; 
    }  

    public TemperatureState getTempState(){
        return this.tempState;
    } 
}