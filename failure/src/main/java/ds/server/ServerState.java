package ds.server;

/**
 * This class is responsible for storing the current messages that the server must store.
 */
public class ServerState {
    private String sensorFailure;
    private String sensorFutureFailure;
    private String production;

    public ServerState() {
        this.sensorFailure = null;
        this.sensorFutureFailure = null;
        this.production = null;
    }

    public void setSensorFailure(String sensorFailure) {
        this.sensorFailure = sensorFailure;
    }

    public void setSensorFutureFailure(String sensorFutureFailure) {
        this.sensorFutureFailure = sensorFutureFailure;
    }

    public void setProduction(String production) {
        this.production= production;
    }

    public String getSensorFailure() {
        return this.sensorFailure;
    }

    public String getSensorFutureFailure() {
        return this.sensorFutureFailure;
    }

    public String getProduction(){
        return this.production;
    }

}
