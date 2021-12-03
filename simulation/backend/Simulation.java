import java.util.HashMap;
import java.util.Map;

public class Simulation {

    public static void main(String[] args) {
        Map<Integer, Machine> machines = new HashMap<>();
        
        //TODO: Machines must be read from a JSON
        Machine cuttingMachine = new CuttingMachine(60.0f, 0.5f, 1.0f);
        machines.put(1, cuttingMachine);

        //TODO: Receive user input from front end
        int numPieces = Integer.parseInt(args[0]);

        for(int i = 0; i < numPieces; i++){
            for (Machine m : machines.values()) {
                m.update();
            }
        }

        //TODO: Standardize Machine Representation
        System.out.println("Machine final state after cutting " + numPieces + " pieces:\n" + cuttingMachine.getRepresentation());

        //TODO: Transform Machine Representation into JSON

        //TODO: Send JSON to the front end
    }
}
