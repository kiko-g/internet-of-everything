package ds.graph;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject;

import ds.graph.sensor.Sensor;


// TODO - delete unused variables
public class MachineNode {  
    
    private int id;                         
    private MachineNode next;             // Children machines. [machine output to these] 

    ConcurrentHashMap<String, Float> defaultValues;      // The maximum values allowed by the machine. 
    // Necessary materials to make the machine produce the output. The key is the product id and the value is the amount.
    ConcurrentHashMap<String, Integer> currentInput; 
    Integer productCounter;                              // How many subproducts were produced.


    // NEW NEW
    ConcurrentHashMap<Integer, Sensor> sensorProperties;
    String input;           // Type of material to be received by the machine. 
    String output;          // Type of material to be produced by the machine.

    public MachineNode(int id, String input, String output){
        this.id = id; 
        this.input = input;
        this.output = output;
        this.sensorProperties = new ConcurrentHashMap<>();
    }

    public int getId(){
        return this.id;
    } 

    public String getOutput(){
        return this.output;
    } 

    public ConcurrentHashMap<String, Float> getDefaults(){
        return this.defaultValues;
    } 

    public Integer getProductCount(){
        return this.productCounter;
    } 

    public MachineNode getNext(){
        return this.next;
    } 

    public void addDefault(String name, Float value){
        defaultValues.put(name, value); 
    }

    //###############################################
    public void addSensor(JSONObject sensorJson){
        int id = sensorJson.getInt("id");
        this.sensorProperties.put(id, new Sensor(id,sensorJson.getJSONObject("attributes")));
    }

    public void setNext(MachineNode nextMachine){
        this.next = nextMachine;
    }

    //###############################################

    public void addOutput(String id){
        this.output = id; 
    } 

    public void addCurrentInput(String prod){
        Integer currAmountProd = this.currentInput.getOrDefault(prod, 0); 
        this.currentInput.put(prod, currAmountProd + 1);  
    }

    public void updateCounter(){ 
        this.productCounter++;
    }

    // public void cleanProducedInput(){
    //     for (String key: this.currentInput.keySet()){
    //         Integer expectedAmount = this.inputs.get(key); 
    //         Integer currAmount = this.currentInput.get(key); 

    //         Integer remainingInput = currAmount - expectedAmount;
    //         this.currentInput.put(key, remainingInput);
    //     }
    // }

    public Integer getCurrentInput(String prod){
        return this.currentInput.get(prod);
    }

    /**
     * Case the product can be produced.
     * @return 
     */
    // public boolean canProduce(){ 
    //     for (String key: this.inputs.keySet()){ 
    //         Integer expectedValue = this.inputs.get(key); 
    //         Integer currentValue = this.currentInput.get(key); 
    //         if (currentValue < expectedValue){
    //             return false; 
    //         }
    //     }    
    //     return true; 
    // }

    @Override
    public String toString(){
        StringBuilder s = new StringBuilder();  
        s.append("[ID]: ").append(this.id).append("\n"); 

        if(this.next != null){
            s.append("[NEXT]: ");
            s.append(this.next.getId()).append(" ");
            s.append("\n");
        }

    
        // TODO - change this
        // s.append("[DFLT]:\n"); 
        // defaultValues.keySet().forEach(propertyName -> {
        //     s.append("- ").append(propertyName).append(" ").append(defaultValues.get(propertyName)).append("\n"); 
        // });

        s.append("[INPUT]:").append(this.input).append("\n");

        s.append("[OUTPUT]:").append(this.output).append("\n"); 

        return s.toString();
    }

}
    