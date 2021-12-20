package ds.graph;
import org.json.JSONObject; 
import org.json.JSONArray;
import java.nio.file.Files;
import java.io.IOException; 
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap; 

public class Graph { 
    ConcurrentHashMap<String, MachineNode> nodes; 

    public Graph(){
        this("./data/graph.json");
    }

    public Graph(String filename){  
        nodes = new ConcurrentHashMap<>(); 
        try{
            JSONObject json = this.readJsonGraph(filename);  
            this.addEmptyNodes(json);
            this.addProperties(json);
        } catch(Exception e){
            e.printStackTrace();
        }
    } 
    /**
     * Reads the graph json file to build it in code.
     * @param filename Name of the file. 
     * @return File content as JSONObject
     * @throws IOException 
     */
    public JSONObject readJsonGraph(String filename) throws IOException{ 
        byte[] encoded = Files.readAllBytes(Paths.get(filename));
        return new JSONObject(new String (encoded));
    }


    /**
     * Fills the this.nodes variable with empty nodes that just contains the id. 
     * Just after adding all the nodes to the HashMap, it's possible to add the next and previous nodes. 
     * @param json The json that contains the graph structure. 
     */
    public void addEmptyNodes(JSONObject json){
        json.keySet().forEach(id -> {
            this.nodes.put(id, new MachineNode(id)); 
        });
    }

    /**
     * Adds the property for each node in the graph. 
     * @param json The json object describing the graph.
     */
    public void addProperties(JSONObject json) {
        json.keySet().forEach(id -> {
            MachineNode machineNode = nodes.get(id); 
            JSONObject machineJson = json.getJSONObject(id); 
            this.addPrevNodes(machineNode, machineJson.getJSONArray("prev"));       
            this.addNextNodes(machineNode, machineJson.getJSONArray("next")); 
            this.addDefaultValues(machineNode, machineJson.getJSONObject("default")); 
            this.addInputs(machineNode, machineJson.getJSONObject("input"));
            this.addOutput(machineNode, machineJson.getString("output"));
        });
    }

    public void addPrevNodes(MachineNode machineNode, JSONArray prevNodes){  
        prevNodes.forEach(id -> {
            MachineNode prevNode = nodes.get(id); 
            if (prevNode != null) 
                machineNode.addPrevMachine(prevNode);
        });
    }  

    public void addNextNodes(MachineNode machineNode, JSONArray nextNodes){  
        nextNodes.forEach(id -> {
            MachineNode nextNode = nodes.get(id); 
            if (nextNode != null) 
                machineNode.addNextMachine(nextNode);
        });
    } 

    public void addDefaultValues(MachineNode machineNode, JSONObject defaultValues){
        defaultValues.keySet().forEach(propertyName -> {
            machineNode.addDefault(propertyName, defaultValues.getDouble(propertyName));
        });
    }

    public void addInputs(MachineNode machineNode, JSONObject inputs){
        inputs.keySet().forEach(inputId -> {
            machineNode.addInput(inputId, inputs.getInt(inputId));
        });
    } 

    public void addOutput(MachineNode machineNode, String prodId){
        machineNode.addOutput(prodId);
    }

    public MachineNode getMachineNode(String machineId){
        return this.nodes.get(machineId); 
    }

    public List<MachineNode> getStartMachines(){
        List<MachineNode> startMachines = new ArrayList<>();

        for(MachineNode node: this.nodes.values()){
            if(node.getInputs().isEmpty()){
                startMachines.add(node);
            }
        }

        return startMachines;
    }

    public String toString(){ 
        StringBuilder s = new StringBuilder(); 
        nodes.keySet().forEach(id-> {
            s.append("==========================\n");
            s.append(nodes.get(id).toString());
        }); 

        return s.toString();
    }

}
