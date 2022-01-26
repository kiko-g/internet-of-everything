package ds.server;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;

interface Handler extends HttpHandler {
    @Override
    default void handle(HttpExchange httpExchange) throws IOException {
        if ("GET".equals(httpExchange.getRequestMethod())) {
            String jsonResponse = this.getResponse(httpExchange);
            this.sendResponse(httpExchange, jsonResponse);
        }
    }

    default void sendResponse(HttpExchange httpExchange, String jsonResponse) throws IOException {
        sendHeader(httpExchange, jsonResponse);
        OutputStream outputStream = httpExchange.getResponseBody();
        httpExchange.sendResponseHeaders((200), jsonResponse.getBytes().length);
        outputStream.write(jsonResponse.getBytes());
        outputStream.flush();
        outputStream.close();
    }

    default void sendHeader(HttpExchange httpExchange, String jsonResponse) throws IOException {
        Headers header = httpExchange.getResponseHeaders();
        header.add("Content-Type", "application/json"); 
        header.add("Access-Control-Allow-Origin", "*"); 
        header.add("Access-Control-Allow-Headers", "*"); 
    }

    String getResponse(HttpExchange httpExchange);

}
