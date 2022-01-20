package ds.server;

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
        OutputStream outputStream = httpExchange.getResponseBody();
        httpExchange.sendResponseHeaders((200), jsonResponse.length());
        outputStream.write(jsonResponse.getBytes());
        outputStream.flush();
        outputStream.close();
    }

    String getResponse(HttpExchange httpExchange);

}
