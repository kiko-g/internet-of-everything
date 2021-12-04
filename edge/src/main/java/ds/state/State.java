package ds.state;
import java.util.concurrent.ConcurrentHashMap;

/**
 * This class is responsible for managing the current state of all machines. 
 */
public class State {
    private ConcurrentHashMap<String, MachineState> machineState; 

    public void addMachine(String id, MachineState state){
        machineState.put(id, state);
    }

    public MachineState getMachineState(String id){
        return this.machineState.get(id); 
    } 

    public MachineState removeMachine(String id){
        return this.machineState.remove(id);
    }

    public boolean findMachine(String id){
        return this.machineState.get(id) != null;
    }
}
