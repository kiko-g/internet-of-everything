package ds.graph.sensor; 
public class Values {
    public double min; 
    public double max;  

    public Values(double min, double max) {
        this.min = min;
        this.max = max; 
    }
    public double getMax(){
        return this.max; 
    }

    public double getMin(){
        return this.min;
    } 

    public String toString() {
        return "[" + this.min + "," + this.max+ "]";
    }
}