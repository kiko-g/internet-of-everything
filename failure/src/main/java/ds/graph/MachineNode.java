package ds.graph;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject;
import ds.graph.sensor.Sensor;

public class MachineNode {  
    
    private String id;                         
    private MachineNode next;   // Children machine. [machine sends output to this] 
    private MachineNode prev;   // Parent machines. [machine receives input from this] 
    private ConcurrentHashMap<String, Sensor> sensorProperties; // Machine sensors
    private String input;            // Type of material to be received by the machine. 
    private String output;           // Type of material to be produced by the machine.
    private float defectProbability; // Defect probability in percentage

    Integer inCounter; 
    Integer outCounter;  // How many subproducts were produced.
    Integer defectiveProducts;

    public MachineNode(String id, String input, String output, float defectProbability){
        this.id = id; 
        this.sensorProperties = new ConcurrentHashMap<>();
        this.input = input;
        this.output = output;
        this.inCounter = 0; 
        this.outCounter = 0; 
        this.defectiveProducts = 0;
        this.defectProbability = defectProbability;
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

    public float getDefectProbability(){
        return this.defectProbability;
    } 

    public Integer getDefectiveCount(){
        return this.defectiveProducts;
    } 

    public float getDefectRate(){
        if(this.outCounter == 0)
            return 0;
        
        return (float)this.defectiveProducts/this.outCounter;
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

    public void addDefectiveProduct(){ 
        this.defectiveProducts++;
    }

    @Override
    public String toString(){
        StringBuilder s = new StringBuilder();  
        s.append("[ID]: ").append(this.id).append("\n"); 

        if(!isStartMachine()){
            s.append("[PREV]: ");
            s.append(this.prev.getId()).append(" ");
            s.append("\n");
        }

        if(!isEndMachine()){
            s.append("[NEXT]: ");
            s.append(this.next.getId()).append(" ");
            s.append("\n");
        }

        this.sensorProperties.forEach((key, value) -> System.out.println(value));

        s.append("[INPUT]:").append(this.input).append("\n");

        s.append("[OUTPUT]:").append(this.output).append("\n"); 

        return s.toString();
    }

    public boolean isEndMachine(){
        return this.next == null;
    }

    public boolean isStartMachine(){
        return this.prev == null;
    }
}
