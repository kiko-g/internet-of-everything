package ds.server;

import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;

import static com.mongodb.client.model.Filters.eq;

import ds.FailureService;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.sun.net.httpserver.HttpExchange;


public class Server {
    HttpServer server;
    MongoCollection<Document> collection;

    public Server(MongoCollection<Document> collection) throws Exception {
        Integer serverPort = Integer.parseInt(System.getenv("SERVER_PORT"));
        this.collection = collection;
        this.server = HttpServer.create(new InetSocketAddress(serverPort), 0);
        this.server.createContext("/failure",
                (Handler) (httpExchange) -> FailureService.serverState.getSensorFailure());
        this.server.createContext("/future-failure",
                (Handler) (httpExchange) -> FailureService.serverState.getSensorFutureFailure());
        this.server.createContext("/production",
                (Handler) (httpExchange) -> FailureService.serverState.getProduction());
        this.server.createContext("/product-state", (Handler) (httpExchange) -> this.getProduct(httpExchange));
        this.server.setExecutor(null);
    }

    public void init() {
        this.server.start();
    }

    public String getProduct(HttpExchange httpExchange) {
        String[] query = httpExchange.getRequestURI().getQuery().split("=");
        JSONArray jsonArray = new JSONArray();

        if (query[0].equals("productID")) {
            FindIterable<Document> iterable = this.collection.find(eq("productID", query[1]));
            MongoCursor<Document> cursor = iterable.iterator();
            cursor.forEachRemaining((doc) -> jsonArray.put(new JSONObject(doc.toJson())));
        }

        return jsonArray.toString(4);

    }

}
