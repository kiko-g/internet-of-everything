package ds.graph;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

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
    Integer inCounter; 
    Integer outCounter;                              // How many subproducts were produced.

    public MachineNode(String id, String input, String output){
        this.id = id; 
        this.input = input;
        this.output = output;
        this.outCounter = 0; 
        this.inCounter = 0; 
        this.sensorProperties = new ConcurrentHashMap<>();
    }

    public String getId(){
        return this.id;
    } 

    public String getOutput(){
        return this.output;
    } 

    public Integer getOutCount(){
        return this.outCounter;
    } 

    public MachineNode getNext(){
        return this.next;
    } 

    public MachineNode getPrev(){
        return this.prev;
    } 

    public ConcurrentHashMap<String, Sensor> getSensors(){
        return this.sensorProperties;
    } 

    public Sensor getSensor(String sensorID){
        return this.sensorProperties.get(sensorID);
    } 

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

    public void addOutput(String id){
        this.output = id; 
    } 
    public void updateInCounter(){ 
        this.inCounter++;
    }
    public void updateOutCounter(){ 
        this.outCounter++;
    }

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

        this.sensorProperties.forEach((key, value) -> System.out.println(value));

        s.append("[INPUT]:").append(this.input).append("\n");

        s.append("[OUTPUT]:").append(this.output).append("\n"); 

        return s.toString();
    }

}
