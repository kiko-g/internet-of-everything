import ds.graph.sensor.Values;
import ds.state.sensor.MeasureState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MeasureStateTest {

    MeasureState measureState;

    @BeforeEach
    void initMeasureState() {
        Values expectedValues = new Values(0f, 10f);
        this.measureState = new MeasureState(expectedValues);
    }

    
    @Test
    void testAddUnderMinValue() {
        boolean result = measureState.add(-1f);
        assertFalse(result, "Added a measure under the min value");
    }

    @Test
    void testAddAboveMaxValue() {
        assertFalse(measureState.add(11f), "Added a measure above the max value");
    }

    @Test
    void testAddMinValue() {
        assertTrue(measureState.add(0f), "Couldn't add measure equal to min value");
    }

    @Test
    void testAddMaxValue() {
        assertTrue(measureState.add(10f), "Couldn't add measure equal to max value");
    }

    @Test
    void testAddValueInsideRange() {
        int previousLastMeasures = measureState.getLastMeasures().size();

        boolean result = measureState.add(5f);
        double mostRecentMeasure = measureState.getMostRecentMeasures();
        int lastMeasures = measureState.getLastMeasures().size();
        double meanMeasure = measureState.getMeanMeasure();

        assertTrue(result, "Couldn't add measure inside min to max values range");
        assertEquals(5f, mostRecentMeasure, "mostRecentMeasure is not updated with added measure");
        assertEquals(previousLastMeasures +1, lastMeasures, "lastMeasures was not enqueued with added measure");
        assertEquals(5f, meanMeasure, "sumMeasure was not updated correctly");
    }

    @Test
    void testAddValueAfterLimit() {
        measureState.add(1f);
        measureState.add(2f);
        measureState.add(3f);
        measureState.add(4f);
        measureState.add(5f);

        int previousLastMeasures = measureState.getLastMeasures().size();

        boolean result = measureState.add(6f);
        int lastMeasures = measureState.getLastMeasures().size();
        double frontMeasure = measureState.getLastMeasures().peek();
        double mostRecentMeasure = measureState.getMostRecentMeasures();
        double meanMeasure = measureState.getMeanMeasure();

        assertEquals(previousLastMeasures, lastMeasures, "lastMeasures did not maintain the size limit");
        assertEquals(2f, frontMeasure, "lastMeasures was not dequeued correctly");
        assertEquals(6f, mostRecentMeasure, "mostRecentMeasure was not updated correctly");
        assertEquals((2f+3f+4f+5f+6f)/5, meanMeasure, "sumMeasures was not updated correctly");
    }
}
