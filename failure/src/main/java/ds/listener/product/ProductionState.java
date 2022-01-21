package ds.listener.product;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import java.util.concurrent.ConcurrentHashMap;

import ds.graph.MachineNode;

/**
 * Information regarding the production
 */
public class ProductionState {
    private ConcurrentHashMap<String, ProductTime> lastInputTimes; // Last input time of each machine
    private ConcurrentHashMap<String, LocalDateTime> firstInputTimes; // First Input time of each machine
    private ConcurrentHashMap<String, Long> productionTimes; // Sum of all production times
    private String startMachineID;
    private MachineNode endMachine;

    public ProductionState(List<String> machineIds, String startMachineID, MachineNode endMachine){
        this.lastInputTimes = new ConcurrentHashMap<>();
        this.productionTimes = new ConcurrentHashMap<>();
        this.firstInputTimes = new ConcurrentHashMap<>();

        this.startMachineID = startMachineID;
        this.endMachine = endMachine;

        this.init(machineIds);
    }

    public void init(List<String> machineIds){
        for(String machineID: machineIds){
            this.productionTimes.put(machineID, Long.valueOf(0));
        }
    }


    public void saveProductionTime(MachineNode machine, String productID, LocalDateTime outputDt){
        String machineID = machine.getId();

        if(this.lastInputTimes.containsKey(machineID)){
            ProductTime lastProductIn = this.lastInputTimes.get(machineID);

            // Last productId IN matches last productId OUT
            if(productID.equals(lastProductIn.getProductId())){
                LocalDateTime inputDt = lastProductIn.getReadingTime();
                long productionTime = ChronoUnit.MILLIS.between(inputDt, outputDt);
    
                // Add new production time to the machine
                this.productionTimes.compute(machineID, (key, val) -> val + productionTime); 
            } 
        }
    }

    public void saveInputTime(String machineID, String productID, LocalDateTime readTime){
        // Verify if the machine exists
        if(!this.productionTimes.containsKey(machineID)) return;

        // Add last input time
        this.lastInputTimes.put(machineID, new ProductTime(productID, readTime));

        // Add first input time of the machine
        if(!this.firstInputTimes.containsKey(machineID))
            this.firstInputTimes.put(machineID, readTime);
    }

    public double getProductionTime(MachineNode machine){
        if(machine.getOutCount() == 0) return 0;
        return (double) this.productionTimes.get(machine.getId()).longValue()/ machine.getOutCount();
    }

    public double getProductionRate(MachineNode machine){
        if(machine.getOutCount() == 0 || !this.firstInputTimes.containsKey(machine.getId())){
            return 0;
        }

        int qualityProducts = machine.getOutCount().intValue() - machine.getDefectiveCount().intValue();

        LocalDateTime firstInputDt = this.firstInputTimes.get(machine.getId());
        long timeUntilNow = ChronoUnit.MILLIS.between(firstInputDt, LocalDateTime.now());

        // Number of non-defective products produced by the machine since it started working
        return (double) (1000*qualityProducts)/timeUntilNow;
    }

    public double getTotalProductionRate(){
        if(endMachine.getOutCount() == 0 || !this.firstInputTimes.containsKey(startMachineID)) return 0;

        int qualityProducts = endMachine.getOutCount().intValue() - endMachine.getDefectiveCount().intValue();
        LocalDateTime firstInputDt = this.firstInputTimes.get(startMachineID);
        long timeUntilNow = ChronoUnit.MILLIS.between(firstInputDt, LocalDateTime.now());
        
        // Number of non-defective products produced since the production started
        return (double) (10000*qualityProducts)/timeUntilNow;
    }

}
