package ds.failures;
import ds.state.MachineState;
import ds.state.TemperatureState;

import java.util.*;

/**
 * This class is responsible for processing temperature machine failures
 */
public class TemperatureFailure extends MachineFailure {
    public static final Integer FUTURE_BEHAVIOUR = 3; // Number of states with increasing temperature to be sent a warning 
    
    @Override
    public void checkMachine(MachineState currentState) {
        TemperatureState tempState = currentState.getTempState();
        Float currentTemp = tempState.getCurrentTemp();
        if(currentTemp > tempState.getMaxTemp()){
            System.out.println("MachineID :: " + currentState.getId() + 
            ":: Temperature surpassed " + currentTemp + "/" + tempState.getMaxTemp());
            this.takeAction(currentState.getId());
        }
    }

    @Override
    public void futureBehaviour(MachineState currentState) {
        TemperatureState tempState = currentState.getTempState(); 
        
        Queue<Float> temps = tempState.getTempQueue();    
        Iterator<Float> iterator = temps.iterator();
        
        Float prevTemp = iterator.next();
        int numConsecutive = 0;
        System.out.println("Temperatures: \n" + prevTemp + "\n");

        while (iterator.hasNext()) {
            Float currentTemp = iterator.next();
            System.out.print(currentTemp + "\n");
            if (currentTemp >= prevTemp) 
                numConsecutive += 1;

            prevTemp = currentTemp;
        }
        System.out.println("\n Consecutive Increase: " + numConsecutive);

        // TODO: Check if the machine is close to the max temperature
        /* 
        if (close) {
            if (numConsecutive > FUTURE_BEHAVIOUR) {
                DANGER POSSIBLE SHUTDOWN FOR A WHILE TO PREVENT DAMAGING COMPONENTS
            } else {
                WARNING
            }
        } else if (numConsecutive > FUTURE_BEHAVIOUR) { */
        if (numConsecutive > FUTURE_BEHAVIOUR) { 
            System.out.println("\n Possibility of overheating soon");

            // Alert Machines
        }
    }

    @Override
    public void takeAction(String machineID) {
        System.out.println("MachineID :: " + machineID + " :: Cooling up the Machine");
        // Stop production
        // Alert other machines
    }
}
