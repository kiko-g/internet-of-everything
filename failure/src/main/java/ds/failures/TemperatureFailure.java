package ds.failures;
import ds.state.MachineState;
import ds.state.TemperatureState;

/**
 * This class is responsible for processing temperature machine failures
 */
public class TemperatureFailure extends MachineFailure {

    @Override
    public void checkMachine(MachineState currentState) {
        TemperatureState tempState = currentState.getTempState();
        Float currentTemp =tempState.getCurrentTemp();
        if(currentTemp > tempState.getMaxTemp()){
            System.out.println("Temperature surpassed" +
                                "\nCurrent temperature: " + currentTemp);
            this.takeAction();
        }

    }

    @Override
    public void takeAction() {
        System.out.println("Cooling up the Machine");
        // Stop production
        // Alert other machines
    }
}
