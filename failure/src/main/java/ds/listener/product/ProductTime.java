package ds.listener.product;

import java.time.LocalDateTime;

public class ProductTime {
    private String productID;
    private LocalDateTime readingTime;

    public ProductTime(String productID, LocalDateTime readingTime){
        this.productID = productID;
        this.readingTime = readingTime;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((productID == null) ? 0 : productID.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProductTime other = (ProductTime) obj;
        if (productID == null) {
            if (other.productID != null)
                return false;
        } else if (!productID.equals(other.productID))
            return false;
        return true;
    }

    public String getProductId(){
        return this.productID;
    }

    public LocalDateTime getReadingTime(){
        return this.readingTime;
    }

}
