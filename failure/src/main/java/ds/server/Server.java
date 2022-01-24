package ds.server;

import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;

import ds.listener.ProductListener;

import static com.mongodb.client.model.Filters.eq;


import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.sun.net.httpserver.HttpExchange;

/**
 * Allows HTTP communication with the frontend
 */
public class Server {
    HttpServer server;
    MongoCollection<Document> failureCollection;
    MongoCollection<Document> productCollection;

    public Server(MongoCollection<Document> productCollection, MongoCollection<Document> failureCollection) throws Exception { 
        Integer serverPort = Integer.parseInt(System.getenv("SERVER_PORT"));
        this.productCollection = productCollection;
        this.failureCollection = failureCollection;

        this.server = HttpServer.create(new InetSocketAddress(serverPort), 0);

        this.server.createContext("/production",
                (Handler) (httpExchange) -> ProductListener.productionTable.getProduction());
        this.server.createContext("/product-state", (Handler) (httpExchange) -> this.getProduct(httpExchange));
        this.server.createContext("/failure", (Handler) (httpExchange) -> this.getFailures(httpExchange));
        this.server.setExecutor(null);
    }

    public void init() {
        this.server.start();
    }

    public String getProduct(HttpExchange httpExchange) {
        String[] query = httpExchange.getRequestURI().getQuery().split("=");
        JSONArray jsonArray = new JSONArray();

        if (query[0].equals("productID")) {
            FindIterable<Document> iterable = this.productCollection.find(eq("productID", query[1]));
            MongoCursor<Document> cursor = iterable.iterator();
            cursor.forEachRemaining((doc) -> jsonArray.put(new JSONObject(doc.toJson())));
        }

        return jsonArray.toString(4);
    }

    public String getFailures(HttpExchange httpExchange) {
        String[] query = httpExchange.getRequestURI().getQuery().split("=");
        JSONArray jsonArray = new JSONArray();

        if (query[0].equals("machineID")) {
            FindIterable<Document> iterable = this.failureCollection.find(eq("machineID", query[1]));
            MongoCursor<Document> cursor = iterable.iterator();
            cursor.forEachRemaining((doc) -> jsonArray.put(new JSONObject(doc.toJson())));
        }

        return jsonArray.toString(4);

    }

}
