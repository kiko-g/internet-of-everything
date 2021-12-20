package ds.graph;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class MachineNode { 
    private List<MachineNode> prev;     // Machines that output to this machine. 
    private List<MachineNode> next;     
    private String id;  
    HashMap<String, Double> defaultValues; 
    // Necessary materials to make the machine produce the output. The key is the product id and the value is the amount.
    HashMap<String, Integer> inputs;    

    public MachineNode(String id){
        this.id = id;
        this.next = new ArrayList<>();
        this.prev = new ArrayList<>();  
        this.defaultValues = new HashMap<>();  
        this.inputs = new HashMap<>();
    }

    public String getId(){
        return id;
    } 

    public void addPrevMachine(MachineNode machineNode){
        this.prev.add(machineNode);
    } 

    public void addNextMachine(MachineNode machineNode){
        this.next.add(machineNode);
    } 

   
    public void addDefault(String name, Double value){
        defaultValues.put(name, value); 
    }

    public void addInput(String id, Integer amount) {
        this.inputs.put(id, amount);
    }

    @Override
    public String toString(){
        StringBuilder s = new StringBuilder();  
        s.append("[ID]: ").append(this.id).append("\n"); 
 
        s.append("[PREV]: ");
        prev.forEach(prevNode-> {
            s.append(prevNode.getId()).append(" ");
        });  
        s.append("\n"); 

        s.append("[NEXT]: ");
        next.forEach(prevNode-> {
            s.append(prevNode.getId()).append(" ");
        });
        s.append("\n");
        s.append("[DFLT]:\n"); 
        defaultValues.keySet().forEach(propertyName -> {
            s.append("- ").append(propertyName).append(" ").append(defaultValues.get(propertyName)).append("\n"); 
        });
        s.append("\n"); 
        s.append("[INPUT]:\n");
        inputs.keySet().forEach(prodId -> {
            s.append("- ").append(prodId).append(" : ").append(inputs.get(prodId)).append("\n");
        });
        s.append("\n");
        return s.toString();
    }

}
