package ds.listener.product;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import java.util.concurrent.ConcurrentHashMap;

import ds.graph.MachineNode;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Information regarding the production
 */
public class ProductionState {
    private ConcurrentHashMap<String, ProductTime> lastInputTimes; // Last input time of each machine
    private ConcurrentHashMap<String, LocalDateTime> firstTimes; // First time registed for each machine
    private ConcurrentHashMap<String, Long> productionTimes; // Sum of all production times
    private ConcurrentHashMap<String, Long> accountedProductionTimes; // Number of production times being considered
    private MachineNode endMachine;
    private LocalDateTime startTime;

    public ProductionState(List<String> machineIds, MachineNode endMachine){
        this.lastInputTimes = new ConcurrentHashMap<>();
        this.productionTimes = new ConcurrentHashMap<>();
        this.accountedProductionTimes = new ConcurrentHashMap<>();
        this.firstTimes = new ConcurrentHashMap<>();

        Dotenv dotenv = Dotenv.load();
        this.startTime = LocalDateTime.now().plusSeconds(Integer.parseInt(dotenv.get("START_DELAY")));
        this.endMachine = endMachine;

        this.init(machineIds);
    }

    public void init(List<String> machineIds){
        for(String machineID: machineIds){
            this.productionTimes.put(machineID, Long.valueOf(0));
            this.accountedProductionTimes.put(machineID, Long.valueOf(0));
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
                this.accountedProductionTimes.compute(machineID, (key, val) -> val + 1); 
            } 
        } else if(!this.firstTimes.containsKey(machineID)) {
            // Add time of the first reading of the machine
            this.firstTimes.put(machineID, outputDt);
        }
    }

    public void saveInputTime(String machineID, String productID, LocalDateTime readTime){
        // Verify if the machine exists
        if(!this.productionTimes.containsKey(machineID)) return;

        // Add last input time
        this.lastInputTimes.put(machineID, new ProductTime(productID, readTime));

        // Add time of the first reading of the machine
        if(!this.firstTimes.containsKey(machineID))
            this.firstTimes.put(machineID, readTime);
    }

    public double getProductionTime(String machineID){
        long nTimes = accountedProductionTimes.get(machineID).longValue();
        if(nTimes == 0) return 0;
        return (double) this.productionTimes.get(machineID).longValue()/ nTimes;
    }

    public double getProductionRate(MachineNode machine){
        if(machine.getOutCount() == 0 || !this.firstTimes.containsKey(machine.getId())){
            return 0;
        }
    
        // Number of non-defective products produced by the machine since it started working
        int qualityProducts = machine.getOutCount().intValue() - machine.getDefectiveCount().intValue();

        LocalDateTime firstInputDt = this.firstTimes.get(machine.getId());
        long timeUntilNow = ChronoUnit.MILLIS.between(firstInputDt, LocalDateTime.now());
        
        return (double) (1000*qualityProducts)/timeUntilNow;
    }

    public double getTotalProductionRate(){
        if(endMachine.getOutCount() == 0) return 0;

        int qualityProducts = endMachine.getOutCount().intValue() - endMachine.getDefectiveCount().intValue();
        long timeUntilNow = ChronoUnit.MILLIS.between(startTime, LocalDateTime.now());
        
        // Number of non-defective products produced since the production started
        return (double) (10000*qualityProducts)/timeUntilNow;
    }

}
