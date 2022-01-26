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

        final File folder = new File("../data");
        ArrayList<String> files = listFilesForFolder(folder);

        for (String file: files) {
            //JSON parser object to parse read file
            JSONParser jsonParser = new JSONParser();

            try (FileReader reader = new FileReader("../data/" + file))
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

        //Get machine status
        Long machineStatus = (Long) machineInfo.get("status");

        //Get machine defectProbability
        Long machineDefectProbability = (Long) machineInfo.get("defectProbability");

        //Get machine input
        String machineInput = (String) machineInfo.get("input");

        //Get machine output
        String machineOutput = (String) machineInfo.get("output");

        //Get machine timePerBatch
        Long machineTimePerBatch = (Long) machineInfo.get("timePerBatch");

        String prevMachineID = (String) machineInfo.get("prevMachineID");
        System.out.println("MACHINE " + machineID + " has prevMachineID=" + prevMachineID);

        //Get machine output
        String nextMachineID = (String) machineInfo.get("nextMachineID");

        JSONArray sensorList = (JSONArray) machineInfo.get("sensors");

        ArrayList<Sensor> sensors = new ArrayList<Sensor>();

        byte[] config = machineInfo.toString().getBytes();

        //Iterate over employee array
        sensorList.forEach( sensor -> parseSensorObject( (JSONObject) sensor, machineID, sensors));
    
        Machine newMachine = new Machine(machineID, machineStatus, machineDefectProbability, machineInput, machineOutput, machineTimePerBatch, prevMachineID, nextMachineID, config);
        machines.add(newMachine);

        newMachine.setSensors(sensors);

    }

    private static void parseSensorObject(JSONObject sensor, String machineID, ArrayList<Sensor> sensors)
    {
        //Get sensor id
        String sensorID = (String) sensor.get("id");

        //Get sensor type
        String sensorType = (String) sensor.get("type");

        //Get sensor type
        Long sensorUpdateInterval = (Long) sensor.get("updateInterval");

        JSONObject sensorAttributes = (JSONObject) sensor.get("attributes");

        switch (sensorType){
            case "TEMPERATURE":
                JSONObject tempAttribute = (JSONObject) sensorAttributes.get("temperature");

                Long tempMin = (Long) tempAttribute.get("min");
                Long tempMax = (Long) tempAttribute.get("max");
                Long tempAvg = (Long) tempAttribute.get("avg");
                Long tempStandardDeviation = (Long) tempAttribute.get("standardDeviation");

                TemperatureSensor tempSensor = new TemperatureSensor(sensorID, machineID, tempMin, tempMax, tempAvg, tempStandardDeviation, sensorUpdateInterval);
                sensors.add(tempSensor);
                break;
            case "POSITION":
                JSONObject positionX = (JSONObject) sensorAttributes.get("x");

                Long xMin = (Long) positionX.get("min");
                Long xMax = (Long) positionX.get("max");
                Long xAvg = (Long) positionX.get("avg");
                Long xStandardDeviation = (Long) positionX.get("standardDeviation");

                JSONObject positionY = (JSONObject) sensorAttributes.get("y");

                Long yMin = (Long) positionY.get("min");
                Long yMax = (Long) positionY.get("max");
                Long yAvg = (Long) positionY.get("avg");
                Long yStandardDeviation = (Long) positionY.get("standardDeviation");

                PositionSensor posSensor = new PositionSensor(sensorID, machineID, xMax, xMin, xAvg, yMax, yMin, yAvg, xStandardDeviation, yStandardDeviation, sensorUpdateInterval);
                sensors.add(posSensor);
                break;
            case "VELOCITY":
                JSONObject velocityAttribute = (JSONObject) sensorAttributes.get("velocity");

                Long velMin = (Long) velocityAttribute.get("min");
                Long velMax = (Long) velocityAttribute.get("max");
                Long velAvg = (Long) velocityAttribute.get("avg");
                Long velStandardDeviation = (Long) velocityAttribute.get("standardDeviation");

                MachineVelocitySensor velSensor = new MachineVelocitySensor(sensorID, machineID, velMin, velMax, velAvg, velStandardDeviation, sensorUpdateInterval);
                sensors.add(velSensor);
                break;
            case "VIBRATION":
                JSONObject vibrationAttribute = (JSONObject) sensorAttributes.get("vibration");

                Long vibMin = (Long) vibrationAttribute.get("min");
                Long vibMax = (Long) vibrationAttribute.get("max");
                Double vibAvg = (Double) vibrationAttribute.get("avg");
                Long vibStandardDeviation = (Long) vibrationAttribute.get("standardDeviation");

                VibrationSensor vibSensor = new VibrationSensor(sensorID, machineID, vibMin, vibMax, vibAvg, vibStandardDeviation, sensorUpdateInterval);
                sensors.add(vibSensor);
                break;
            case "PRODUCTION_SPEED":
                JSONObject prodSpeedAttribute = (JSONObject) sensorAttributes.get("productionSpeed");

                Long prodSpeedMin = (Long) prodSpeedAttribute.get("min");
                Long prodSpeedMax = (Long) prodSpeedAttribute.get("max");
                Double prodSpeedAvg = (Double) prodSpeedAttribute.get("avg");
                Long prodSpeedStandardDeviation = (Long) prodSpeedAttribute.get("standardDeviation");

                ProductionSpeedSensor prodSpeedSensor = new ProductionSpeedSensor(sensorID, machineID, prodSpeedMin, prodSpeedMax, prodSpeedAvg, prodSpeedStandardDeviation, sensorUpdateInterval);
                sensors.add(prodSpeedSensor);
                break;
            case "ENERGY":
                JSONObject energyAttribute = (JSONObject) sensorAttributes.get("energy");

                Long energyMin = (Long) energyAttribute.get("min");
                Long energyMax = (Long) energyAttribute.get("max");
                Long energyAvg = (Long) energyAttribute.get("avg");
                Long energyStandardDeviation = (Long) energyAttribute.get("standardDeviation");

                EnergySensor energySensor = new EnergySensor(sensorID, machineID, energyMin, energyMax, energyAvg, energyStandardDeviation, sensorUpdateInterval);
                sensors.add(energySensor);
                break;
            case "ORIENTATION":
                JSONObject orientationAttribute = (JSONObject) sensorAttributes.get("orientation");

                Long orientationMin = (Long) orientationAttribute.get("min");
                Long orientationMax = (Long) orientationAttribute.get("max");
                Double orientationAvg = (Double) orientationAttribute.get("avg");
                Long orientationStandardDeviation = (Long) orientationAttribute.get("standardDeviation");

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
