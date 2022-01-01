package ds.failures;
import ds.state.MachineState;
//import ds.state.TemperatureState;

/**
 * This class is responsible for processing temperature machine failures
 */
public class TemperatureFailure extends MachineFailure {

    @Override
    public void checkMachine(MachineState currentState) {
       /* TemperatureState tempState = currentState.getTempState();
        Float currentTemp = tempState.getCurrentTemp();
        if(currentTemp > tempState.getMaxTemp()){
            System.out.println("MachineID :: " + currentState.getId() + 
            ":: Temperature surpassed " + currentTemp + "/" + tempState.getMaxTemp());
            this.takeAction(currentState.getId());
        }*/

    }

    @Override
    public void takeAction(String machineID) {
        System.out.println("MachineID :: " + machineID + " :: Cooling up the Machine");
        // Stop production
        // Alert other machines
    }
}
