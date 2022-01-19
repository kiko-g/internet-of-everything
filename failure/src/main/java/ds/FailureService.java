package ds;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.util.concurrent.TimeUnit;

import com.mongodb.DB;
import com.mongodb.client.MongoCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoClientURI;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.ValidationOptions;

import org.bson.BsonType;
import org.bson.Document;
import org.bson.conversions.Bson;

import ds.graph.Graph;
import ds.listener.MachineListener;
import ds.listener.ProductListener;
import ds.server.Server;
import ds.server.ServerState;

public class FailureService {
    MachineListener machineListener;
    ProductListener productListener;
    Graph machinesGraph;
    Server server;
    public static ServerState serverState;

    private MongoClient mongoClient;  
    private MongoDatabase database;
    private MongoCollection<Document> collection; 
    /**
     * Starts the failure service by activating the machine listener and product listener. 
     */
    public FailureService() {
        try { 
            serverState = new ServerState();
            this.machinesGraph = new Graph(); 
            this.initDatabase();
            this.machineListener = new MachineListener(this.machinesGraph);
            this.productListener = new ProductListener(this.machinesGraph, this.collection);
            this.server = new Server();  
        } catch (Exception e){
            System.err.println("Not possible to initialize server");
            e.printStackTrace();
        }
    }


    public void initDatabase() throws Exception{
        this.mongoClient = new MongoClient(new MongoClientURI("mongodb://root:root@mongo:27017"));
        
        this.database = mongoClient.getDatabase("manufacturing"); 

        Bson machineID = Filters.type("machineID", BsonType.STRING);
        Bson defect = Filters.type("defect", BsonType.BOOLEAN);
        Bson date = Filters.type("date", BsonType.DATE_TIME);
        Bson action = Filters.type("action", BsonType.STRING);
        Bson readTime = Filters.type("readTime", BsonType.STRING);
        Bson productID= Filters.type("productID", BsonType.STRING);
        Bson validator = Filters.and(machineID, defect, action,readTime,productID, date);

        ValidationOptions validationOptions = new ValidationOptions().validator(validator);
        this.database.getCollection("production_state").drop();
        this.database.createCollection("production_state", 
            new CreateCollectionOptions().validationOptions(validationOptions));
        this.collection = this.database.getCollection("production_state"); 
        // TODO: change seconds to minutes
        this.collection.createIndex(Indexes.ascending("date"), new IndexOptions().expireAfter(10L, TimeUnit.SECONDS)); 
    }


    public void init(){
        this.machineListener.init();
        this.productListener.init();
        this.server.init();
    }

    public static void main(String[] args) throws Exception{
        FailureService failureService = new FailureService();
        failureService.init();
    }
}
