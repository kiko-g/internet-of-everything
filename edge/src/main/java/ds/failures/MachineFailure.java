package ds.state;
import java.util.Random;

/**
 * This class is responsible for processing machine failures
 */
public abstract class MachineFailure {
    abstract public void checkMachine();

    abstract public void takeAction();
}