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
            this.server = new Server(this.collection);  
        } catch (Exception e){
            System.err.println("Not possible to initialize server");
            e.printStackTrace();
        }
    }

    /**
     * Initializes the database and the collection. 
     * @throws Exception
     */
    public void initDatabase() throws Exception{
        String username = System.getenv("DB_USERNAME"); 
        String password = System.getenv("DB_PASSWORD");
        String port = System.getenv("DB_PORT");
        this.mongoClient = new MongoClient(new MongoClientURI("mongodb://" + username +":" + password + "@mongo:" + port));
        
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
        this.collection.createIndex(Indexes.ascending("date"), new IndexOptions().expireAfter(1L, TimeUnit.HOURS)); 
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
