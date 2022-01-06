import org.eclipse.paho.mqttv5.common.MqttException;

import java.util.ArrayList;

public class App {
    static ArrayList<Machine> machines;

    public static void main(String[] args) {
        machines = new ArrayList<>();
        machines.add(new Machine("m1"));

        for(Machine machine: machines) {
            machine.start();
        }
    }
}
