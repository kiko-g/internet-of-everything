package ds.server;
import com.sun.net.httpserver.HttpHandler;  
import com.sun.net.httpserver.HttpExchange;
import java.io.OutputStream;
import java.io.IOException;
import java.lang.StringBuilder; 

public class Handler implements HttpHandler {
    @Override
    public void handle(HttpExchange httpExchange) throws IOException { 
        String requestParamValue = null; 
        if ("GET".equals(httpExchange.getRequestMethod())){
            requestParamValue = handleGetRequest(httpExchange);
        }
        handleResponse(httpExchange, requestParamValue); 
    }

    public String handleGetRequest(HttpExchange httpExchange){
        return httpExchange.getRequestURI()
                .toString()
                .split("\\?")[1]
                .split("=")[1]; 
    }

    public void handleResponse(HttpExchange httpExchange, String requestParamValue) throws IOException{
        OutputStream outputStream = httpExchange.getResponseBody();
        StringBuilder jsonResponse = new StringBuilder();
        
        jsonResponse.append(requestParamValue);
        httpExchange.sendResponseHeaders((200), jsonResponse.length());
        outputStream.write(jsonResponse.toString().getBytes()); 
        outputStream.flush();
        outputStream.close(); 
    }
}

