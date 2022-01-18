package ds.server; 
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import ds.FailureService;

public class Server {
    HttpServer server; 
    public Server() throws Exception{
        int port = 9000;
        this.server = HttpServer.create(new InetSocketAddress(port), 0);
        this.server.createContext("/failure", (Handler)() -> FailureService.serverState.getSensorFailure());
        this.server.createContext("/future-failure", (Handler)() -> FailureService.serverState.getSensorFutureFailure());
        this.server.createContext("/production", (Handler)() -> FailureService.serverState.getProduction());
        this.server.setExecutor(null);
    } 

    public void init(){
        this.server.start();
    }

}
