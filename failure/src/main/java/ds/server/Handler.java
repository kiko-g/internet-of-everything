package ds.server;
import com.sun.net.httpserver.HttpHandler;  
import com.sun.net.httpserver.HttpExchange;
import ds.FailureService;
import ds.failures.Failure;

import java.io.OutputStream;
import java.io.IOException;
import java.lang.StringBuilder; 

public class Handler implements HttpHandler {
    @Override
    public void handle(HttpExchange httpExchange) throws IOException { 
        String requestParamValue = null; 
        if ("GET".equals(httpExchange.getRequestMethod())){ 
            handleResponse(httpExchange); 
        }
    }

    public void handleResponse(HttpExchange httpExchange) throws IOException{
        OutputStream outputStream = httpExchange.getResponseBody();
        StringBuilder jsonResponse = new StringBuilder();
        
        jsonResponse.append(FailureService.serverState.getSensorFailure());
        httpExchange.sendResponseHeaders((200), jsonResponse.length());
        outputStream.write(jsonResponse.toString().getBytes()); 
        outputStream.flush();
        outputStream.close(); 
    }
}

