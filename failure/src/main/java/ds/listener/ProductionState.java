package ds.listener;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import ds.graph.MachineNode;

/**
 * Information regarding the production
 */
public class ProductionState {
    private ConcurrentHashMap<String, ConcurrentLinkedQueue<LocalDateTime>> inputTimes; // Input times of each machine
    private ConcurrentHashMap<String, LocalDateTime> firstInputTimes; // First Input time of each machine
    private ConcurrentHashMap<String, Long> productionTimes; // Sum of all production times
    private String startMachineID;
    private MachineNode endMachine;

    public ProductionState(List<String> machineIds, String startMachineID, MachineNode endMachine){
        this.inputTimes = new ConcurrentHashMap<>();
        this.productionTimes = new ConcurrentHashMap<>();
        this.firstInputTimes = new ConcurrentHashMap<>();

        this.startMachineID = startMachineID;
        this.endMachine = endMachine;

        this.init(machineIds);
    }

    public void init(List<String> machineIds){
        for(String machineID: machineIds){
            this.inputTimes.put(machineID, new ConcurrentLinkedQueue<>());
            this.productionTimes.put(machineID, Long.valueOf(0));
        }
    }

    public void saveProductionTime(MachineNode machine, LocalDateTime outputDt){
        String machineID = machine.getId();

        if(this.inputTimes.containsKey(machineID)){
            LocalDateTime inputDt = this.inputTimes.get(machineID).poll();
            long productionTime = ChronoUnit.MILLIS.between(inputDt, outputDt);

            // Add new production time to the machine
            if(inputDt == null) return;
            this.productionTimes.compute(machineID, (key, val) -> val + productionTime); 

        }
    }

    public void saveInputTime(String machineID, LocalDateTime readTime){
        if(!this.inputTimes.containsKey(machineID)) return;

        // Add first input time of the machine
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

    public double getTotalProductionRate(){
        if(endMachine.getOutCount() == 0) return 0;

        int qualityProducts = endMachine.getOutCount().intValue() - endMachine.getDefectiveCount().intValue();
        LocalDateTime firstInputDt = this.firstInputTimes.get(startMachineID);
        long timeUntilNow = ChronoUnit.MILLIS.between(firstInputDt, LocalDateTime.now());
        return (double) (10000*qualityProducts)/timeUntilNow;
    }

}
