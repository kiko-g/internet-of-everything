package ds.state;
import java.util.concurrent.ConcurrentHashMap;

/**
 * This class is responsible for managing the current state of all machines, the system state.
 */
public class State {
    private ConcurrentHashMap<String, MachineState> machineState;

    /**
     * Adds a machine to the system. If the machine already exists the state will be overwritten by the new one.
     * @param machineID The machine identification.
     * @param state The new machine state.
     */
    public void addMachine(String machineID, MachineState state){
        machineState.put(machineID, state);
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
        return this.machineState.get(machineID) != null;
    }
}
