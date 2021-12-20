package ds.graph;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject; 
import java.nio.file.Files; 
import java.io.IOException; 
import java.nio.file.Paths;
import java.util.HashMap; 

public class Phases {   
    private HashMap<String, Phase> phases;
     private Graph machines;
    
    public Phases(String filename, Graph machines){
        this.machines = machines;
        try{
            JSONObject json = this.readJsonFile(filename); 
            this.phases = new HashMap<>();
            this.addEmptyPhases(json);
            this.addProperties(json); 
        } catch(Exception e){
            e.printStackTrace();
        }
    }

    public JSONObject readJsonFile(String filename) throws IOException{ 
        byte[] encoded = Files.readAllBytes(Paths.get(filename));
        return new JSONObject(new String (encoded));
    }

    public void addEmptyPhases(JSONObject json) throws JSONException{ 
        json.keySet().forEach(phaseId-> { 
            phases.put(phaseId, new Phase(phaseId)); 
        });
    }

    public void addProperties(JSONObject json) throws JSONException {
        json.keySet().forEach(phaseId -> {
            Phase phase = this.phases.get(phaseId);
            JSONObject jsonPhase = json.getJSONObject(phaseId); 
            this.addAmount(phase, jsonPhase.getJSONObject("amount"));
            this.addOutMachines(phase, jsonPhase.getJSONArray("out_machine"));
        });
    }

    public void addAmount(Phase phaseNode, JSONObject amounts){
        amounts.keySet().forEach(prodId -> { 
            phaseNode.addAmount(prodId, amounts.getInt(prodId));
        }); 
    } 

    public void addOutMachines(Phase phase, JSONArray outMachines){
        outMachines.forEach(machineId -> {
            MachineNode machineNode = this.machines.getMachineNode(machineId.toString()); 
            phase.addOutMachine(machineId.toString(), machineNode);
        });
    }

    public String toString(){
        StringBuilder builder = new StringBuilder(); 
        this.phases.keySet().forEach(phaseId -> {
            builder.append("==========================\n"); 
            builder.append(this.phases.get(phaseId));
        });
        return builder.toString();
    }
    /*public boolean isPhaseComplete(String phaseId){
        if(this.phases.containsKey(phaseId)){
            return phases.get(phaseId).isComplete()
        }

        return false;
    }*/

}
