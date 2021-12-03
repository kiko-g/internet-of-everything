public class CuttingMachine implements Machine {

    private float temperature, temperatureVariation, speed;

    //TODO: Add more arguments based on the factory.json
    public CuttingMachine(float temp, float tempVar, float speed){
        this.speed = speed;
        this.temperature = temp;
        this.temperatureVariation = tempVar;
    }

    @Override
    public void update() {
        this.temperature += this.temperatureVariation;
    }

    @Override
    //TODO: Add more information about the machine
    public String getRepresentation() {
        String representation = " - Temperature: " + temperature + "C\n";
        return representation;
    }
    
}
