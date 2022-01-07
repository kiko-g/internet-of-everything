import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.stream.Stream;

import Sensors.*;

import javax.swing.*;

public class Parser {

    static ArrayList<Machine> machines = new ArrayList<Machine>();

    public static void main(String[] args) throws IOException {

        final File folder = new File("src/main/java/machinesJSON");
        ArrayList<String> files = listFilesForFolder(folder);

        for (String file: files) {
            //JSON parser object to parse read file
            JSONParser jsonParser = new JSONParser();

            try (FileReader reader = new FileReader("src/main/java/machinesJSON/" + file))
            {
                //Read JSON file
                Object obj = jsonParser.parse(reader);

                JSONObject machineInfo = (JSONObject) obj;

                parseMachineJson(machineInfo);


            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (ParseException e) {
                e.printStackTrace();
            }

        }

        for(Machine machine: machines) {
            machine.start();
        }

    }

    public static ArrayList<String> listFilesForFolder(final File folder) {
        ArrayList<String> fileNames = new ArrayList<>();
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry);
            } else {
                fileNames.add(fileEntry.getName());
            }
        }

        return fileNames;
    }

    private static void parseMachineJson(JSONObject machineInfo)
    {
        //Get machine id
        String machineID = (String) machineInfo.get("id");
        System.out.println("ID: " + machineID + "\n");

        //Get machine status
        Long machineStatus = (Long) machineInfo.get("status");
        //System.out.println("Status: " + machineStatus + "\n");

        //Get machine defectProbability
        Long machineDefectProbability = (Long) machineInfo.get("defectProbability");
        //System.out.println("Defect Probability: " + machineDefectProbability + "\n");

        //Get machine input
        String machineInput = (String) machineInfo.get("input");
        //System.out.println("Input: " + machineInput + "\n");

        //Get machine output
        String machineOutput = (String) machineInfo.get("output");
        //System.out.println("Output: " + machineOutput + "\n");

        //Get machine timePerBatch
        Long machineTimePerBatch = (Long) machineInfo.get("timePerBatch");
        //System.out.println("Time per Batch: " + machineTimePerBatch + "\n");

        //Get machine output
        String nextMachineID = (String) machineInfo.get("nextMachineID");
        //System.out.println("Next Machine ID: " + nextMachineID + "\n");

        JSONArray sensorList = (JSONArray) machineInfo.get("sensors");
        //System.out.println(sensorList);

        ArrayList<Sensor> sensors = new ArrayList<Sensor>();

        //Iterate over employee array
        sensorList.forEach( sensor -> parseSensorObject( (JSONObject) sensor, machineID, sensors));

        Machine newMachine = new Machine(machineID, machineStatus, machineDefectProbability, machineInput, machineOutput, machineTimePerBatch, nextMachineID);
        machines.add(newMachine);

        //System.out.println("Sensor List: " + sensors + "\n");
        newMachine.setSensors(sensors);

    }

    private static void parseSensorObject(JSONObject sensor, String machineID, ArrayList<Sensor> sensors)
    {
        //Get sensor id
        String sensorID = (String) sensor.get("id");
        System.out.println(sensorID);

        //Get sensor type
        String sensorType = (String) sensor.get("type");
        //System.out.println(sensorType);

        //Get sensor type
        Long sensorUpdateInterval = (Long) sensor.get("updateInterval");
        //System.out.println(sensorUpdateInterval);

        JSONObject sensorAttributes = (JSONObject) sensor.get("attributes");
        //System.out.println(sensorAttributes);
        //System.out.println("Attributes:");

        switch (sensorType){
            case "TEMPERATURE":
                JSONObject tempAttribute = (JSONObject) sensorAttributes.get("temperature");
                //System.out.println("temperature:");
                Long tempMin = (Long) tempAttribute.get("min");
                //System.out.println("min: " + tempMin);
                Long tempMax = (Long) tempAttribute.get("max");
                //System.out.println("max: " + tempMax);
                Long tempAvg = (Long) tempAttribute.get("avg");
                //System.out.println("avg: " + tempAvg);
                Long tempStandardDeviation = (Long) tempAttribute.get("standardDeviation");
                //System.out.println("Standard Deviation: " + tempStandardDeviation);
                //System.out.println("\n");

                TemperatureSensor tempSensor = new TemperatureSensor(sensorID, machineID, tempMin, tempMax, tempAvg, tempStandardDeviation, sensorUpdateInterval);
                sensors.add(tempSensor);
                break;
            case "POSITION":
                JSONObject positionX = (JSONObject) sensorAttributes.get("x");
                //System.out.println("position x:");
                Long xMin = (Long) positionX.get("min");
                //System.out.println("min: " + xMin);
                Long xMax = (Long) positionX.get("max");
                //System.out.println("max: " + xMax);
                Long xAvg = (Long) positionX.get("avg");
                //System.out.println("avg: " + xAvg);
                Long xStandardDeviation = (Long) positionX.get("standardDeviation");
                //System.out.println("Standard Deviation: " + xStandardDeviation);

                JSONObject positionY = (JSONObject) sensorAttributes.get("y");
                //System.out.println("position y:");
                Long yMin = (Long) positionY.get("min");
                //System.out.println("min: " + yMin);
                Long yMax = (Long) positionY.get("max");
                //System.out.println("max: " + yMax);
                Long yAvg = (Long) positionY.get("avg");
                //System.out.println("avg: " + yAvg);
                Long yStandardDeviation = (Long) positionY.get("standardDeviation");
                //System.out.println("Standard Deviation: " + yStandardDeviation);
                //System.out.println("\n");

                PositionSensor posSensor = new PositionSensor(sensorID, machineID, xMax, xMin, xAvg, yMax, yMin, yAvg, xStandardDeviation, yStandardDeviation, sensorUpdateInterval);
                sensors.add(posSensor);
                break;
            case "VELOCITY":
                JSONObject velocityAttribute = (JSONObject) sensorAttributes.get("velocity");
                //System.out.println("velocity:");
                Long velMin = (Long) velocityAttribute.get("min");
                //System.out.println("min: " + velMin);
                Long velMax = (Long) velocityAttribute.get("max");
                //System.out.println("max: " + velMax);
                Long velAvg = (Long) velocityAttribute.get("avg");
                //System.out.println("avg: " + velAvg);
                Long velStandardDeviation = (Long) velocityAttribute.get("standardDeviation");
                //System.out.println("Standard Deviation: " + velStandardDeviation);
                //System.out.println("\n");

                MachineVelocitySensor velSensor = new MachineVelocitySensor(sensorID, machineID, velMin, velMax, velAvg, velStandardDeviation, sensorUpdateInterval);
                sensors.add(velSensor);
                break;
            case "VIBRATION":
                JSONObject vibrationAttribute = (JSONObject) sensorAttributes.get("vibration");
                //System.out.println("vibration:");
                Long vibMin = (Long) vibrationAttribute.get("min");
                //System.out.println("min: " + vibMin);
                Long vibMax = (Long) vibrationAttribute.get("max");
                //System.out.println("max: " + vibMax);
                Double vibAvg = (Double) vibrationAttribute.get("avg");
                //System.out.println("avg: " + vibAvg);
                Long vibStandardDeviation = (Long) vibrationAttribute.get("standardDeviation");
                //System.out.println("Standard Deviation: " + vibStandardDeviation);
                //System.out.println("\n");

                VibrationSensor vibSensor = new VibrationSensor(sensorID, machineID, vibMin, vibMax, vibAvg, vibStandardDeviation, sensorUpdateInterval);
                sensors.add(vibSensor);
                break;
            case "PRODUCTION_SPEED":
                JSONObject prodSpeedAttribute = (JSONObject) sensorAttributes.get("productionSpeed");
                //System.out.println("production speed:");
                Long prodSpeedMin = (Long) prodSpeedAttribute.get("min");
                //System.out.println("min: " + prodSpeedMin);
                Long prodSpeedMax = (Long) prodSpeedAttribute.get("max");
                //System.out.println("max: " + prodSpeedMax);
                Double prodSpeedAvg = (Double) prodSpeedAttribute.get("avg");
                //System.out.println("avg: " + prodSpeedAvg);
                Long prodSpeedStandardDeviation = (Long) prodSpeedAttribute.get("standardDeviation");
                //System.out.println("Standard Deviation: " + prodSpeedStandardDeviation);
                //System.out.println("\n");

                ProductionSpeedSensor prodSpeedSensor = new ProductionSpeedSensor(sensorID, machineID, prodSpeedMin, prodSpeedMax, prodSpeedAvg, prodSpeedStandardDeviation, sensorUpdateInterval);
                sensors.add(prodSpeedSensor);
                break;
            case "ENERGY":
                JSONObject energyAttribute = (JSONObject) sensorAttributes.get("energy");
                //System.out.println("energy:");
                Long energyMin = (Long) energyAttribute.get("min");
                //System.out.println("min: " + energyMin);
                Long energyMax = (Long) energyAttribute.get("max");
                //System.out.println("max: " + energyMax);
                Long energyAvg = (Long) energyAttribute.get("avg");
                //System.out.println("avg: " + energyAvg);
                Long energyStandardDeviation = (Long) energyAttribute.get("standardDeviation");
                //System.out.println("Standard Deviation: " + energyStandardDeviation);
                //System.out.println("\n");

                EnergySensor energySensor = new EnergySensor(sensorID, machineID, energyMin, energyMax, energyAvg, energyStandardDeviation, sensorUpdateInterval);
                sensors.add(energySensor);
                break;
            case "ORIENTATION":
                JSONObject orientationAttribute = (JSONObject) sensorAttributes.get("orientation");
                //System.out.println("orientation:");
                Long orientationMin = (Long) orientationAttribute.get("min");
                //System.out.println("min: " + orientationMin);
                Long orientationMax = (Long) orientationAttribute.get("max");
                //System.out.println("max: " + orientationMax);
                Double orientationAvg = (Double) orientationAttribute.get("avg");
                //System.out.println("avg: " + orientationAvg);
                Long orientationStandardDeviation = (Long) orientationAttribute.get("standardDeviation");
                //System.out.println("Standard Deviation: " + orientationStandardDeviation);
                //System.out.println("\n");

                MachineOrientationSensor orientationSensor = new MachineOrientationSensor(sensorID, machineID, orientationMin, orientationMax, orientationAvg, orientationStandardDeviation, sensorUpdateInterval);
                sensors.add(orientationSensor);
                break;
            case "QR_CODE":
                String action = (String) sensorAttributes.get("action");

                QRCodeSensor qrCodeSensor = new QRCodeSensor(sensorID, machineID, action, sensorUpdateInterval);
                sensors.add(qrCodeSensor);
                break;

        }


    }

}
