import java.util.Random;

public class Machine {
    // Attributes
    // private State state;
    private int id;
    private float temperature;
    private int max_temperature;

    public Machine() {
        // this.state = new State();
        this.id = 1;
        this.temperature = 50;
        this.max_temperature = 100;
    }


    public void dump(){
        System.out.println("[Id]:"+ this.id + "[temperature]" + this.temperature);
    }

    public boolean overheating(){
        if(this.temperature > this.max_temperature){
            System.out.println("Temperature surpassed" +
                    "\nCurrent temperature: " + this.temperature +
                    "\nMaximum temperature: " + this.max_temperature);
            return true;
        }

        return false;
    }

    public void analysis_status(){
        if(overheating()) this.cooling();
    }

    private void cooling(){
        System.out.println("Cooling up the Machine");
        // Stop production

        // Alert other machines
    }




}
