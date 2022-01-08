package ds.graph.sensor; 
public class Values {
    public float min; 
    public float max;  

    public Values(float min, float max) {
        this.min = min;
        this.max = max; 
    }
    public float getMax(){
        return this.max; 
    }

    public float getMin(){
        return this.min;
    } 

    public String toString() {
        return "[" + this.min + "," + this.max+ "]";
    }
}