package ds.failures;
import ds.state.MachineState;
import ds.state.TemperatureState;

import java.util.*;

import org.json.JSONObject;

/**
 * This class is responsible for processing temperature machine failures
 */
public class TemperatureFailure extends MachineFailure {
    private static final Integer NOERROR_NUM = 1;
    private static final Integer UNKNOW_ERROR_NUM = 0;
    private static final Integer ERROR_NUM = 1; 

    private static final Integer FUTURE_BEHAVIOUR = 3; // Number of states with increasing temperature to be sent a warning 
    
    @Override
    public void checkMachine(MachineState currentState) {
        TemperatureState tempState = currentState.getTempState();
        Float currentTemp = tempState.getCurrentTemp();
        if(currentTemp > tempState.getMaxTemp()) {
            System.out.println("MachineID :: " + currentState.getId() + 
            ":: Temperature surpassed " + currentTemp + "/" + tempState.getMaxTemp());

            this.takeAction(currentState.getId());
        } else {
            futureBehaviour(currentState);
        }
    }

    @Override
    public String futureBehaviour(MachineState currentState) {
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
        float close = tempState.getMaxTemp() - tempState.getCurrentTemp();
        if (close < 10.0) {
            if (numConsecutive > FUTURE_BEHAVIOUR) {
                System.out.println("\n Immeninent user case");
                return getResponseMessage(currentState.getId(), "Critical", NOERROR_NUM);
            } else {
                System.out.println("\n Temperature close to the limit");
                return getResponseMessage(currentState.getId(), "Warning", NOERROR_NUM);
            }
        } else if (numConsecutive > FUTURE_BEHAVIOUR) {
            System.out.println("\n Possibility of overheating soon");
            return getResponseMessage(currentState.getId(), "Warning", NOERROR_NUM);
        }

        return getResponseMessage(currentState.getId(), "Ok", NOERROR_NUM);
    }

    @Override
    public String takeAction(String machineID) {
        System.out.println("MachineID :: " + machineID + " :: Cooling up the Machine");

        return getResponseMessage(machineID, "Failed", ERROR_NUM);
    }
}
