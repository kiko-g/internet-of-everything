package ds.listener;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;

import ds.graph.MachineNode;

public class ProductionState {
    private ConcurrentHashMap<String, Queue<LocalDateTime>> inputTimes;
    private ConcurrentHashMap<String, LocalDateTime> firstInputTimes;
    private ConcurrentHashMap<String, Long> productionTimes;

    public ProductionState(List<String> machineIds){
        this.inputTimes = new ConcurrentHashMap<>();
        this.productionTimes = new ConcurrentHashMap<>();
        this.firstInputTimes = new ConcurrentHashMap<>();
        this.init(machineIds);
    }

    public void init(List<String> machineIds){
        for(String machineID: machineIds){
            this.inputTimes.put(machineID, new LinkedList<>());
            this.productionTimes.put(machineID, Long.valueOf(0));
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
}
