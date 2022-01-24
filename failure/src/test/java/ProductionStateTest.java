import ds.graph.MachineNode;
import ds.listener.ProductionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

public class ProductionStateTest {

    ProductionState productionState;
    MachineNode m0, m1, m2, m3;

    @BeforeEach
    void initProductionState() {
        this.m0 = new MachineNode("m0", "material0", "material1", 10);
        this.m1 = new MachineNode("m1", "material1", "material2", 10);
        this.m2 = new MachineNode("m2", "material2", "material3", 10);
        this.m3 = new MachineNode("m3", "material3", "material4", 20);

        final List<String> machineIds = Arrays.asList("m0", "m1", "m2", "m3");
        this.productionState = new ProductionState(machineIds, "m0", m3);
    }

    @Test
    void testGetProductionTimeNoOutputs() {
        double productionTime = this.productionState.getProductionTime(this.m0);
        assertEquals(0, productionTime, "Machine with 0 outputs returned production time different than 0");
    }

    @Test
    void getProductionTimeOneOutput() {
        this.addInputAndOutput(this.m0, 1);

        double productionTime = this.productionState.getProductionTime(this.m0);
        assertEquals(1000, productionTime, "getProductionTime did not calculate production time 1 correctly");
    }

    @Test
    void getProductionTimeMultipleOutputs() {
        this.addInputAndOutput(this.m0, 1);
        this.addInputAndOutput(this.m0, 2);
        this.addInputAndOutput(this.m0, 1);
        this.addInputAndOutput(this.m0, 5);
        this.addInputAndOutput(this.m0, 1);

        double productionTime = this.productionState.getProductionTime(this.m0);
        assertEquals(2000, productionTime, "getProductionTime did not calculate production time 2 correctly");
    }

    void addInputAndOutput(MachineNode machineNode, long duration) {
        LocalDateTime inputTime = LocalDateTime.now();
        LocalDateTime outputTime = inputTime.plusSeconds(duration);

        this.productionState.saveInputTime(machineNode.getId(), inputTime);
        machineNode.updateInCounter();

        this.productionState.saveProductionTime(machineNode, outputTime);
        machineNode.updateOutCounter();
    }
}
