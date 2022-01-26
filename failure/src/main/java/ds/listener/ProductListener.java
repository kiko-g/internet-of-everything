package ds.listener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import com.mongodb.client.MongoCollection;

import org.bson.Document;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONArray;
import org.json.JSONObject;

import ds.Utils;
import ds.graph.Graph;
import ds.graph.MachineNode;
import ds.listener.product.ProductionState;
import ds.listener.product.ProductionTable;

/**
 * Listens to the messages relative to the product, calculating statistics relative 
 * to the production and allows the tracking of a product
 */
public class ProductListener extends Listener {
    private ScheduledThreadPoolExecutor executor;
    private ProductionState productionState;
    private MongoCollection<Document> collection;
    public static ProductionTable productionTable;

    public ProductListener(Graph graph, MongoCollection<Document> collection) {
        super("product/#", graph);

        try {
            MachineNode endMachine = this.machinesGraph.getEndMachine();
            List<String> machineIds = new ArrayList<String>(this.machinesGraph.getMachines());
            this.productionState = new ProductionState(machineIds, endMachine);
            this.collection = collection;
            ProductListener.productionTable = new ProductionTable();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void init() {
        super.init();

        // Show the production state every 5 seconds
        this.executor = new ScheduledThreadPoolExecutor(5);
        executor.scheduleWithFixedDelay(new Thread(() -> ProductListener.productionTable.setProduction(this.buildMessage())),
                0, 5000, TimeUnit.MILLISECONDS);
    }

    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        try {
            JSONObject messageParsed = new JSONObject(new String(message.getPayload()));
            System.out.println(messageParsed);

            // Get message values
            String machineID = messageParsed.getString("machineID");
            String action = messageParsed.getJSONObject("values").getString("action");
            boolean defect = messageParsed.getJSONObject("values").getBoolean("defect");
            String readTimeStr = messageParsed.getString("readingTime");
            String productID = messageParsed.getJSONObject("values").getString("materialID");
            LocalDateTime readTime = Utils.parseDateTime(readTimeStr);

            MachineNode machine = this.machinesGraph.getMachineNode(machineID);

            // Process output messages
            if (action.equals("OUT")) {
                machine.updateOutCounter();
                this.productionState.saveProductionTime(machine, productID, readTime);

                // Identify defective product
                if (defect) {
                    machine.addDefectiveProduct();
                    System.out.println("MachineID :: " + machine.getId() + ":: Defective Product");
                }
            }
            // Process input messages
            else if (action.equals("IN")) {
                machine.updateInCounter();
                this.productionState.saveInputTime(machineID, productID, readTime);
            } else {
                return;
            }

            // Add product state to the database
            this.insertIntoDatabase(machineID, action, defect, readTimeStr, productID);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * Function resposible for adding product location to the database.
     */
    void insertIntoDatabase(String machineID, String action, boolean defect, String readTime, String productID) {
        try {
            this.collection.insertOne(new Document()
                    .append("machineID", machineID)
                    .append("action", action)
                    .append("defect", defect)
                    .append("readingTime", readTime)
                    .append("productID", productID)
                    .append("dateProduct", new Date()));

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    /**
     * Output details regarding the production (e.g. number of defective products,
     * production rate, ...)
     */
    public void showState() {
        String leftAlignFormat1 = "| %-15s |%n";
        String leftAlignFormat2 = "| %-7s | %-7d | %-11f | %-8d | %-20s | %-15s |%n";
        StringBuilder sb = new StringBuilder();

        sb.append(String.format("%n+-----------------+%n"));
        sb.append(String.format("| Production Rate |%n"));
        sb.append(String.format("+-----------------+%n"));

        sb.append(String.format(leftAlignFormat1,
                Utils.formatDouble(this.productionState.getTotalProductionRate()) + " / 10s"));
        sb.append(String.format("+-----------------+%n"));

        sb.append(String
                .format("%n+---------+---------+-------------+----------+----------------------+-----------------+%n"));
        sb.append(String
                .format("| Machine | Defects | Defect Rate | Products | Mean Production Time | Production Rate |%n"));
        sb.append(String
                .format("+---------+---------+-------------+----------+----------------------+-----------------+%n"));

        for (String machineID : this.machinesGraph.getMachines()) {
            MachineNode machine = this.machinesGraph.getMachineNode(machineID);

            sb.append(String.format(leftAlignFormat2,
                    machineID,
                    machine.getDefectiveCount(),
                    machine.getDefectRate(),
                    machine.getOutCount(),
                    Utils.formatDouble(this.productionState.getProductionTime(machineID)) + " ms",
                    Utils.formatDouble(this.productionState.getProductionRate(machine)) + " / s"));
        }

        sb.append(String
                .format("+---------+---------+-------------+----------+----------------------+-----------------+%n"));
        System.out.println(sb.toString());
    }

    /**
     * Build a json object with the state of the production
     */
    public String buildMessage() {
        JSONArray message = new JSONArray(); 
        JSONObject globalInfo = new JSONObject();
        globalInfo.put("productionRate", this.productionState.getTotalProductionRate());
        message.put(globalInfo);
        for (String machineID : this.machinesGraph.getMachines()) {
            JSONObject machineInfo = new JSONObject();
            MachineNode machine = this.machinesGraph.getMachineNode(machineID);
            machineInfo.put("machineID", machineID);
            machineInfo.put("nDefects", machine.getDefectiveCount());
            machineInfo.put("defectRate", machine.getDefectRate());
            machineInfo.put("nProducts", machine.getOutCount());
            machineInfo.put("meanProductionTime", this.productionState.getProductionTime(machineID));
            machineInfo.put("productionRate", this.productionState.getProductionRate(machine));
            message.put(machineInfo);
        }
        return message.toString(2);
    }

}
