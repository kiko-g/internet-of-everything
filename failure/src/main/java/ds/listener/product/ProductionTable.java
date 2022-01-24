package ds.listener.product;

/**
 * This class is responsible for storing the current messages that the server must store.
 */
public class ProductionTable {
    private String production;

    public ProductionTable() {
        this.production = null;
    }

    public void setProduction(String production) {
        this.production= production;
    }

    public String getProduction(){
        return this.production;
    }

}
