package ds.listener;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import ds.Utils;
import ds.graph.Graph;
import ds.graph.MachineNode;

public class ProductListener extends Listener {
    private ScheduledThreadPoolExecutor executor;
    private ConcurrentHashMap<String, Queue<LocalDateTime>> inputTimes;
    private ConcurrentHashMap<String, LocalDateTime> firstInputTimes;
    private ConcurrentHashMap<String, Long> productionTimes;

    public ProductListener(Graph graph) {
        super("product", graph);
        this.initTimes();
    }

    public void init(){
        super.init();
        this.executor = new ScheduledThreadPoolExecutor(5);
        executor.scheduleWithFixedDelay(new Thread(() -> this.showState()), 0, 5000, TimeUnit.MILLISECONDS);
    }

    public void initTimes(){
        this.inputTimes = new ConcurrentHashMap<>();
        this.productionTimes = new ConcurrentHashMap<>();
        this.firstInputTimes = new ConcurrentHashMap<>();

        for(String machineID: this.machinesGraph.getMachines()){
            this.inputTimes.put(machineID, new LinkedList<>());
            this.productionTimes.put(machineID, Long.valueOf(0));
        }
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
       
        JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
        //System.out.println(messageParsed);

        String machineID = messageParsed.getString("machineID");
        MachineNode machine = this.machinesGraph.getMachineNode(machineID);

        String action = messageParsed.getJSONObject("values").getString("action");
        boolean defect = messageParsed.getJSONObject("values").getBoolean("defect");
        LocalDateTime readTime = Utils.parseDateTime(messageParsed.getString("readingTime"));

        // New sub-product was produced by the machine
        if(action.equals("OUT")){
            machine.updateOutCounter();

            this.saveProductionTime(machineID, readTime);

            if(defect){
                machine.addDefectiveProduct();
                System.out.println("MachineID :: " + machine.getId() + ":: Defective Product");
            }
        }
        // New subproduct was received by the machine
        else if(action.equals("IN")){
            machine.updateInCounter();
            this.saveInputTime(machineID, readTime);
        }
    }

    public void saveProductionTime(String machineID, LocalDateTime outputDt){
        if(this.inputTimes.containsKey(machineID)){
            LocalDateTime inputDt = this.inputTimes.get(machineID).poll();
            Long sumTime = this.productionTimes.get(machineID);
            if(inputDt != null){
                long newTime = sumTime.longValue() + ChronoUnit.MILLIS.between(inputDt, outputDt);
                this.productionTimes.put(machineID, Long.valueOf(newTime));
            }
        }
    }

    public void saveInputTime(String machineID, LocalDateTime readTime){
        if(!this.inputTimes.containsKey(machineID)) return;

        this.inputTimes.get(machineID).add(readTime);
        if(!this.firstInputTimes.containsKey(machineID))
            this.firstInputTimes.put(machineID, readTime);
    }

    public double getProductionTime(MachineNode machine){
        if(machine.getOutCount() == 0) return 0;
        return (double) this.productionTimes.get(machine.getId()).longValue()/ machine.getOutCount();
    }

    public double getProductionRate(MachineNode machine){
        if(machine.getOutCount() == 0) return 0;

        int qualityProducts = machine.getOutCount().intValue() - machine.getDefectiveCount().intValue();
        LocalDateTime firstInputDt = this.firstInputTimes.get(machine.getId());
        long timeUntilNow = ChronoUnit.MILLIS.between(firstInputDt, LocalDateTime.now());
        return (double) (1000*qualityProducts)/timeUntilNow;
    }

    public void showState(){
        String leftAlignFormat = "| %-7s | %-7d | %-11f | %-8d | %-20s | %-15s |%n";
        StringBuilder sb = new StringBuilder();

        sb.append(String.format("%n+---------+---------+-------------+----------+----------------------+-----------------+%n"));
        sb.append(String.format("| Machine | Defects | Defect Rate | Products | Mean Production Time | Production Rate |%n"));
        sb.append(String.format("+---------+---------+-------------+----------+----------------------+-----------------+%n"));

        for(String machineID : this.machinesGraph.getMachines()){
            MachineNode machine = this.machinesGraph.getMachineNode(machineID);

            sb.append(String.format(leftAlignFormat,
                machineID, 
                machine.getDefectiveCount(), 
                machine.getDefectRate(), 
                machine.getOutCount(), 
                Utils.formatDouble(this.getProductionTime(machine)) + " ms",
                Utils.formatDouble(this.getProductionRate(machine)) + "/s"));    
        }

        sb.append(String.format("+---------+---------+-------------+----------+----------------------+-----------------+%n"));
        System.out.println(sb.toString());
    }
}
