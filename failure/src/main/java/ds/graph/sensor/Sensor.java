package ds.graph.sensor;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject; 

public class Sensor { 
    private int id; 
    private ConcurrentHashMap<String, Values> values;

    public Sensor(int id, JSONObject valuesJson){ 
        this.id = id; 
        this.values = new ConcurrentHashMap<>();
        this.init(valuesJson);
    }

    public void init(JSONObject propertiesJson) {
        for (String propertyName: JSONObject.getNames(propertiesJson)){
            JSONObject valuesJson = propertiesJson.getJSONObject(propertyName);
            float min = valuesJson.getFloat("min");
            float max = valuesJson.getFloat("max");
            this.values.put(propertyName, new Values(min, max));
        }
    }

    public float getId(){
        return this.id;  
    }

    public String toString(){
        StringBuilder builder = new StringBuilder();
        builder.append("====== SENSOR PROPERTIES ======");
        values.forEach((propertyName, propertyValues) -> {
            builder.append(propertyName + ": " + propertyValues);
        });
        return builder.toString();
    }
   
}
