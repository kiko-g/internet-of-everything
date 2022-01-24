package ds;
import java.util.concurrent.TimeUnit;

import com.mongodb.client.MongoCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
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

/**
 * Report failures of machines and sensors and allow tracking of the production
 */
public class FailureService {
    MachineListener machineListener;
    ProductListener productListener;
    Graph machinesGraph;
    Server server;

    private MongoClient mongoClient;  
    private MongoDatabase database;
    private MongoCollection<Document> productCollection; 
    private MongoCollection<Document> failureCollection; 

    /**
     * Starts the failure service by activating the machine listener and product listener. 
     */
    public FailureService() {
        try { 
            this.machinesGraph = new Graph(); 
            this.initDatabase();
            this.machineListener = new MachineListener(this.machinesGraph, this.failureCollection);
            this.productListener = new ProductListener(this.machinesGraph, this.productCollection);
            this.server = new Server(this.productCollection, this.failureCollection);  
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

        this.database.getCollection("production_state").drop();
        this.database.getCollection("failure").drop();

        this.database.createCollection("production_state", 
            new CreateCollectionOptions().validationOptions(this.getProductStateValidator()));
        this.database.createCollection("failure", 
            new CreateCollectionOptions().validationOptions(this.getFailureValidator()));

        this.productCollection = this.database.getCollection("production_state"); 
        this.failureCollection = this.database.getCollection("failure"); 

        this.productCollection.createIndex(Indexes.ascending("dateProduct"), new IndexOptions().expireAfter(1L, TimeUnit.HOURS)); 
        this.failureCollection.createIndex(Indexes.ascending("dateFailure"), new IndexOptions().expireAfter(1L, TimeUnit.MINUTES)); 
    }

    /**
     * Validation rules for the insertion of product states in the database
     * @return
     */
    public ValidationOptions getProductStateValidator(){
        Bson date = Filters.type("dateProduct", BsonType.DATE_TIME);
        Bson machineID = Filters.type("machineID", BsonType.STRING);
        Bson defect = Filters.type("defect", BsonType.BOOLEAN);
        Bson action = Filters.type("action", BsonType.STRING);
        Bson readTime = Filters.type("readingTime", BsonType.STRING);
        Bson productID= Filters.type("productID", BsonType.STRING);
        
        Bson validator = Filters.and(machineID, defect, action,readTime,productID, date);
        return new ValidationOptions().validator(validator);
    }

    /**
     * Validation rules for the insertion of failures in the database
     * @return
     */
    public ValidationOptions getFailureValidator(){
        Bson date = Filters.type("dateFailure", BsonType.DATE_TIME);
        Bson machineID = Filters.type("machineID", BsonType.STRING);
        Bson sensorID = Filters.type("sensorID",  BsonType.STRING);
        Bson action = Filters.type("action", BsonType.STRING);
        Bson failureType = Filters.type("failureType", BsonType.STRING);
        Bson failureSeverity = Filters.type("failureSeverity", BsonType.STRING);
        Bson description = Filters.type("description", BsonType.STRING);
        Bson readTime = Filters.type("readingTime", BsonType.STRING);
        
        Bson validator = Filters.and(machineID, sensorID, action, failureType,failureSeverity,description,readTime, date);
        return new ValidationOptions().validator(validator);
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
