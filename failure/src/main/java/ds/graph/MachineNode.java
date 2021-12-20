package ds.graph;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

public class MachineNode { 
    private List<MachineNode> prev;     // Machines that output to this machine. 
    private List<MachineNode> next;     
    private List<Integer> prod_amount; 
    private List<Product> prod;
    private String id;  
    HashMap<String, Double> defaultValues;

    public MachineNode(String id){
        this.id = id;
        this.next = new ArrayList<>();
        this.prev = new ArrayList<>();  
        this.defaultValues = new HashMap<>();  
        // perhaps to change later. 
        this.prod = new ArrayList<>();
        this.prod_amount = new ArrayList<>();
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
        return s.toString();
    }

}
