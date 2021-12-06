package ds.state;
import ds.state.MachineState;
import java.util.Random;

/**
 * This class is responsible for processing temperature machine failures
 */
public class TemperatureFailure extends MachineFailure {
    public void dump() {
        System.out.println("[Id]:"+ this.id + "[temperature]" + this.temperature);
    }

    public void checkMachine(MachineState currentState) {
        if(MachineState.temperature > MachineStates.max_temperature){
            System.out.println("Temperature surpassed" +
                                "\nCurrent temperature: " + this.temperature +
                                "\nMaximum temperature: " + this.max_temperature);
            this.takeAction();
        }

    }

    public void takeAction() {
        System.out.println("Cooling up the Machine");
        // Stop production
        // Alert other machines
    }
}
