package ds.server;

/**
 * This class is responsible for storing the current messages that the server must store.
 */
public class ServerState {
    String sensorFailure;
    String sensorFutureFailure;
    String product;

    public ServerState() {
        this.sensorFailure = null;
    }

    public void setSensorFailure(String sensorFailure) {
        this.sensorFailure = sensorFailure;
    }

    public void setSensorFutureFailure(String sensorFutureFailure) {
        this.sensorFutureFailure = sensorFutureFailure;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getSensorFailure() {
        return this.sensorFailure;
    }

    public String getSensorFutureFailure() {
        return this.sensorFutureFailure;
    }

    public String getProduct(){
        return this.product;
    }

}
