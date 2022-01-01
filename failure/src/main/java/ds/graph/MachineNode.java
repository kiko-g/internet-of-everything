package ds.graph;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentHashMap.KeySetView;

import org.json.JSONObject;
import ds.graph.sensor.Sensor;

public class MachineNode {  
    
    private String id;                         
    private MachineNode next;             // Children machine. [machine sends output to this] 
    private MachineNode prev;             // Parent machines. [machine receives input from this] 
    ConcurrentHashMap<String, Sensor> sensorProperties; //Machine sensors
    String input;           // Type of material to be received by the machine. 
    String output;          // Type of material to be produced by the machine.

    // ConcurrentHashMap<String, Float> defaultValues;      // The maximum values allowed by the machine. 
    // // Necessary materials to make the machine produce the output. The key is the product id and the value is the amount.
    // ConcurrentHashMap<String, Integer> currentInput; 
    // Integer productCounter;                              // How many subproducts were produced.

    public MachineNode(String id, String input, String output){
        this.id = id; 
        this.input = input;
        this.output = output;
        this.sensorProperties = new ConcurrentHashMap<>();
    }

    public String getId(){
        return this.id;
    } 

    public String getOutput(){
        return this.output;
    } 

    // public ConcurrentHashMap<String, Float> getDefaults(){
    //     return this.defaultValues;
    // } 

    // public Integer getProductCount(){
    //     return this.productCounter;
    // } 

    public MachineNode getNext(){
        return this.next;
    } 

    public MachineNode getPrev(){
        return this.prev;
    } 

    public ConcurrentHashMap<String, Sensor> getSensors(){
        return this.sensorProperties;
    }

    // public void addDefault(String name, Float value){
    //     defaultValues.put(name, value); 
    // }

    //###############################################
    public void addSensor(JSONObject sensorJson){
        String id = sensorJson.getString("id");
        this.sensorProperties.put(id, new Sensor(id,sensorJson.getJSONObject("attributes")));
    }

    public void setNext(MachineNode nextMachine){
        this.next = nextMachine;
    }

    public void setPrev(MachineNode prevMachine){
        this.prev = prevMachine;
    }

    //###############################################

    public void addOutput(String id){
        this.output = id; 
    } 

    // public void addCurrentInput(String prod){
    //     Integer currAmountProd = this.currentInput.getOrDefault(prod, 0); 
    //     this.currentInput.put(prod, currAmountProd + 1);  
    // }

    // public void updateCounter(){ 
    //     this.productCounter++;
    // }

    // public void cleanProducedInput(){
    //     for (String key: this.currentInput.keySet()){
    //         Integer expectedAmount = this.inputs.get(key); 
    //         Integer currAmount = this.currentInput.get(key); 

    //         Integer remainingInput = currAmount - expectedAmount;
    //         this.currentInput.put(key, remainingInput);
    //     }
    // }

    // public Integer getCurrentInput(String prod){
    //     return this.currentInput.get(prod);
    // }

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

        if(this.prev != null){
            s.append("[PREV]: ");
            s.append(this.prev.getId()).append(" ");
            s.append("\n");
        }

        if(this.next != null){
            s.append("[NEXT]: ");
            s.append(this.next.getId()).append(" ");
            s.append("\n");
        }

        // TODO - change this, sensor to string secalhar
        // s.append("[DFLT]:\n"); 
        // defaultValues.keySet().forEach(propertyName -> {
        //     s.append("- ").append(propertyName).append(" ").append(defaultValues.get(propertyName)).append("\n"); 
        // });

        s.append("[INPUT]:").append(this.input).append("\n");

        s.append("[OUTPUT]:").append(this.output).append("\n"); 

        return s.toString();
    }

}
