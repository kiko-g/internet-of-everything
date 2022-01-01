package ds.state;
import java.util.concurrent.ConcurrentHashMap;

import ds.graph.Graph;
import ds.graph.sensor.Sensor;

/**
 * This class is responsible for managing the current state of all machines, the system state.
 */
public class State {
    private ConcurrentHashMap<String, MachineState> machineState;
    
    public State(Graph machines){
        this.machineState = new ConcurrentHashMap<>();
        
        this.initMachineStates(machines);
    }
    
    public void initMachineStates(Graph machines){
        for(String machineID : machines.getMachines()){
            ConcurrentHashMap<String, Sensor>  sensors = machines.getMachineNode(machineID).getSensors();
            machineState.put(machineID, new MachineState(machineID, sensors));
        }
    }

    /**
     * Adds a machine to the system. If the machine already exists the state will be overwritten by the new one.
     * @param machineID The machine identification.
     * @param state The new machine state.
     */
    public boolean updateMachine(String machineID, MachineState state){
        if(this.machineState.containsKey(machineID)){
            machineState.put(machineID, state);
            return true; 
        }
        return false;
    }

    /**
     * Retrieves the state of a specific machine.
     * @param machineID The machine identification.
     * @return The MachineState of the specified machine.
     */
    public MachineState getMachineState(String machineID){
        return this.machineState.get(machineID);
    } 

    /**
     * Tells if a machine is being tracked by the system state or not.
     * @param machineID The machine identification.
     * @return True if the machine is being tracked, false otherwise.
     */
    public boolean findMachine(String machineID){
        return this.machineState.containsKey(machineID);
    }
}
