package ds.failures;
import ds.state.MachineState;

/**
 * This class is responsible for processing machine failures
 */
public abstract class MachineFailure {
    abstract public void checkMachine(MachineState currentState);

    abstract public void takeAction(String machineID);
}