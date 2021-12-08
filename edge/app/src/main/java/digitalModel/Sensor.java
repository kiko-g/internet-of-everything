

public class Sensor {

    private String type;
    private float baseline;
    private float baselineVariance;
    private float posX;
    private float posY;
    private boolean on;

    //Maybe the type should be an enum??
    Sensor(String type, float positionX, float positionY) {
        this.posX = positionX;
        this.posY = positionY;
        switch (type){
            case "Temperature":
                this.baseline = 40.0; // ºC
                break;

            case "Vibration":
                this.baseline = 150; // Hz
                break;

            case "Speed":
                this.baseline = 10; // antennas/min
                break;
        }
        this.baselineVariance = this.baseline * 0.05 // 5% variation
        this.on = true;
    }

    public void switchPower() {
        this.on = !this.on;
    }

    
    public float getData() {
        if (!this.on) return -1.0;
        else {
            float random = (this.baselineVariance * -1) + Math.random() *  (this.baselineVariance - (this.baselineVariance * -1))
            return this.baseline + random; 
        }
    }

    public void chaosUpSensor() {
        float up = this.baseline * 0.1; //ups the baseline 10%
        this.baseline += up;
    }

    public void chaosDownSensor() {
        float down = this.baseline + 0.1; 
        this.baseline -= down;
    }    
}