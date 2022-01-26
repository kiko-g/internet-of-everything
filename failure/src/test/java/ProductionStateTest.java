import ds.graph.MachineNode;
import ds.listener.product.ProductionState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
        this.productionState = new ProductionState(machineIds, this.m3);
    }

    @Test
    void testGetProductionTimeNoOutputs() {
        double productionTime = this.productionState.getProductionTime(this.m0.getId());
        assertEquals(0, productionTime, "Machine with 0 outputs returned production time different than 0");
    }

    void addInputAndOutput(long duration) {
        LocalDateTime inputTime = LocalDateTime.now();
        LocalDateTime outputTime = inputTime.plusSeconds(duration);

        this.productionState.saveInputTime(this.m0.getId(), "material0", inputTime);
        this.m0.updateInCounter();

        this.productionState.saveProductionTime(this.m0, "material1", outputTime);
        this.m0.updateOutCounter();
    }
}
