package ds.graph;
import java.util.HashMap;

public class Phase {
    private String id; 
    private HashMap<String, MachineNode> outMachines;
    private HashMap<String, Integer> amounts; 
    
    public Phase(String id){
        this.id = id; 
        this.outMachines = new HashMap<>();
        this.amounts = new HashMap<>();
    } 

    public void addAmount(String prod, Integer amount){
        amounts.put(prod, amount); 
    }

    public void addOutMachine(String machineId, MachineNode machineNode){
        this.outMachines.put(machineId, machineNode);
    }

    public boolean isComplete(int clientId){
        HashMap<String, Integer> currentAmounts = new HashMap<>();

        // Get total subproducts produced in this phase
        for(String machineId: outMachines.keySet()){
            MachineNode machine = outMachines.get(machineId);
            String output = machine.getOutput();

            if(amounts.containsKey(output)){
                Integer currentAmount = currentAmounts.getOrDefault(output,0);
                currentAmount += machine.getProductCount();
                currentAmounts.put(output, currentAmount);
            }
        }

        // Verify if enough output products were produced to satisfy the client
        for(String output: amounts.keySet()){
            Integer currentAmount = currentAmounts.getOrDefault(output,0);
            Integer producedSubProducts = currentAmount / amounts.get(output);

            if(producedSubProducts < clientId)
                return false;
        }

        return true;
    }

    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        builder.append("[ID]:").append(id).append("\n");
        
        builder.append("[OUT MACHINES]: "); 
        this.outMachines.keySet().forEach(machineId -> {
            builder.append(machineId).append(" "); 
        }); 
        builder.append("\n");
        this.amounts.keySet().forEach(machineId -> {
            builder.append("- "); 
            builder.append(machineId).append(": ").append(this.amounts.get(machineId)); 
            builder.append("\n"); 
        });
        
        return builder.toString(); 
    }
}