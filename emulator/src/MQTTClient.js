const mqtt = require('mqtt');

class MQTTClient {
    constructor(){
        const MQTT_OPTIONS = {
            clientId: 'emulator',
            clean: true
        };

        this.client = mqtt.connect('mqtt://localhost', MQTT_OPTIONS);
        
        this.client.on('connect', function () {
            console.log("[MQTT] Connected.");
        });

        this.client.on('reconnect', function () {
            console.log("[MQTT] Reconnecting...");
        });

        this.client.on('offline', function () {
            console.log("[MQTT] Offline.");
        });

        this.client.on('error', function (error) {
            console.error("[MQTT] Error: " + error);
        });

        this.client.on('end', function (error) {
            console.log("[MQTT] End!");
        });
        
        this.client.on('message', function (topic, message) {
            // TODO: handle incomming messages
            // console.log("[MQTT] Message received.")
            // console.log("    topic: " + topic);
            // console.log("    message: " + message.toString());
        });
    }

    on(action, callback) {
        this.client.on(action, callback);
    }

    subscribe(topic, qos=0){
        this.client.subscribe(topic, {qos: qos}, function (err) {
            if (err) {
                console.error("[MQTT] Subscribe error: " + err)
            }
            else {
                console.log("[MQTT] Subscribed to " + topic);
            }
        });
    }

    unsubscribe(topic){
        this.client.unsubscribe(topic, function (err) {
            if (err) {
                console.error("[MQTT] Unsubscribe error: " + err)
            }
            else {
                console.log("[MQTT] Unsubscribed to " + topic);
            }
        });
    }

    publish(topic, message, qos=0){
        this.client.publish(topic, message, {qos:qos}, function (err) {
            if (err) {
                console.error("[MQTT] Publish error: " + err)
            }
            else {
                console.log("[MQTT] Message published.")
                console.log("    topic: " + topic);
                console.log("    message: " + message);
            }
        });
    }

    end(force=false){
        this.client.end(force);
    }

    isConnected(){
        return this.client.connected;
    }

    getLastMessageId(){
        return this.client.getLastMessageId();
    }

    isReconnecting(){
        return this.client.reconnecting;
    }
}

module.exports = MQTTClient