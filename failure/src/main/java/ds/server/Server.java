package ds.server; 
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;  

public class Server {
    HttpServer server; 
    public Server() throws Exception{
        int port = 9000; 
        this.server = HttpServer.create(new InetSocketAddress(port), 0);
        this.server.createContext("/sensor", new Handler());  
        this.server.setExecutor(null);
    } 

    public void init(){
        this.server.start();
    }
    
}
