package ds.graph.sensor;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject; 

public class Sensor { 
    private String id; 
    private ConcurrentHashMap<String, Values> values;

    public Sensor(String id, JSONObject valuesJson){ 
        this.id = id; 
        this.values = new ConcurrentHashMap<>();
        this.init(valuesJson);
    }

    public void init(JSONObject propertiesJson) {
        for (String propertyName: JSONObject.getNames(propertiesJson)){
            JSONObject valuesJson = propertiesJson.getJSONObject(propertyName);
            double min = valuesJson.getDouble("min");
            double max = valuesJson.getDouble("max");
            this.values.put(propertyName, new Values(min, max));
        }
    }

    public String getId(){
        return this.id;  
    }

    public ConcurrentHashMap<String,Values> getValues(){
        return values;
    }

    public String toString(){
        StringBuilder builder = new StringBuilder();
        builder.append("\n- Sensor properties").append("\n");
        values.forEach((propertyName, propertyValues) -> {
            builder.append(propertyName + ": " + propertyValues);
            builder.append("\n");
        });
        return builder.toString();
    }
   
}
