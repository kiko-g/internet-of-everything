import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class Main {
    
    public static void main(String[] args) throws Exception {
        MachineSensor temperatureSensor = new TemperatureSensor();

        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(250);
        executor.scheduleWithFixedDelay(new Thread(() -> temperatureSensor.publish()), 0, 1500, TimeUnit.MILLISECONDS);

        String[] topics = {"temperature"};
        MachineListener machineListener = new MachineListener(topics, 2);
        machineListener.subscribe(temperatureSensor);
    }
}