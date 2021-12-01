import java.util.*;

public class MachineState  {

    private Integer id;  
    private Integer size; 
    private TemperatureState tempState;  

    public MachineState(Integer size, Integer id){ 
        this.tempState = new TemperatureState(size);  
        this.id = id; 
    }  

    public TemperatureState getTempState(){
        return this.tempState;
    } 
    
    
}