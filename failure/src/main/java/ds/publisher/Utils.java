package ds.publisher;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

public final class Utils {
    private static Random rnd = new Random();
    
    public static String getDateTime(){
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        String formattedDate = myDateObj.format(myFormatObj);
        return formattedDate;
    }

    public static float getRandomFloat(float min, float max){
        return round(min + rnd.nextFloat() * (max - min));
    } 

    public static float round(float value) {
        BigDecimal bd = new BigDecimal(Float.toString(value));
        bd = bd.setScale(4, RoundingMode.HALF_UP);
        return bd.floatValue();
    }
}
