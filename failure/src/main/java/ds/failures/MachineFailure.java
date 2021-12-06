package ds.state;
import ds.state.MachineState;

import java.util.Random;

/**
 * This class is responsible for processing machine failures
 */
public abstract class MachineFailure {
    abstract public void checkMachine(MachineState currentState);

    abstract public void takeAction();
}