package ds.server;

/**
 * This class is responsible for storing the current messages that the server must store.
 */
public class ServerState {
    String sensorFailure;
    String product;
    public ServerState(){
        this.sensorFailure = null;
    }
    public void setSensorFailure(String sensor){
        this.sensorFailure = sensor;
    }

    public String getSensorFailure(){
        return this.sensorFailure;
    }

    public void setProduct(String product){
        this.product = product;
    }
}
