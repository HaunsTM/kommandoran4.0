<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { mqttConfig } from '../mqtt.config';
import { Client, Message } from 'paho-mqtt';
import type IMqttMessage from '../interfaces/iMqttMessage';
import { useMqttStore } from '../stores/mqttStore';


@Component
export default class ServiceMqttHomeAssistant extends Vue {
    
    private mqttClient!: Client;
    private topicsAndMessages!: Map<string, IMqttMessage>;
    private mqttStore = useMqttStore();

    private initialize() {
        this.topicsAndMessages = new Map();
        
        const initialMessage:IMqttMessage = {
          timeReceived: -1,
          message: "N/A"
        };

        this.topicsAndMessages.set(mqttConfig.topic.climate_utilityRoomFloor, initialMessage);
        this.topicsAndMessages.set(mqttConfig.topic.climate_mainThermostat, initialMessage);
        this.topicsAndMessages.set(mqttConfig.topic.climate_outdoorRoom, initialMessage);
        this.topicsAndMessages.set(mqttConfig.topic.climate_sjöstorpsvägen_3a, initialMessage);

        this.topicsAndMessages.set(mqttConfig.topic.image_screensaver, initialMessage);

        this.topicsAndMessages.set(mqttConfig.topic.sound_play_file, initialMessage);

        this.topicsAndMessages.set(mqttConfig.topic.transport_departure, initialMessage);
    }

    private connect() {
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
        this.mqttClient = new Client(mqttConfig.connection.hostname, mqttConfig.connection.port, clientId);

        let connectOptions = mqttConfig.connection.options;
        connectOptions.onSuccess = this.onConnect;
        //connectOptions.onFailure = this.onFailure;

        if (this.mqttClient) {
            this.mqttClient.connect(connectOptions);
        }
    }

    private onConnect() {
        if(this.mqttClient) {
            console.log('Connected to MQTT broker');
            
            try {
                for (const topic of this.topicsAndMessages.keys()) {
                    this.mqttClient?.subscribe(topic);
                }
                this.mqttClient.onMessageArrived = this.onMessageArrived;
                this.mqttClient.onConnectionLost = this.onConnectionLost;

            } catch (error) {
                console.error(`Error in connecting to mqtt broker: ${error}`); 
            }
        } else {
            console.log('Could not connect to MQTT broker');
        }
    }

    private onFailure(errorMessage: string, invocationContext: any) {
        console.log('Connection failed: ', errorMessage, invocationContext);
    }

    private onConnectionLost(responseObject: { errorCode: number; errorMessage: string }) {
        if (responseObject.errorCode !== 0) {
            console.log('Connection lost: ' + responseObject.errorMessage);
        }
    }

    private onMessageArrived(message: Message) {
        console.log('Received message: ' + message.payloadString);
        
        try {  
            const mqttMessage: IMqttMessage = {
                timeReceived: Date.now(),
                message: message.payloadString
            };
            const topic = message.destinationName;
            this.topicsAndMessages.set(topic, mqttMessage);
            console.log({mqttMessage});
        } catch (error) {
            console.error(`Error in receiving mqtt: ${error}`); 
        }
    }

    sendMessage(topic: string, message: string) {
        let mqttMessage = new Message(message);
        mqttMessage.destinationName = topic;
        this.mqttClient.send(mqttMessage);
    }

    /** hooks */
    private created(): void {
        this.initialize();
        //this.startMqttService(mqttConfig.clientOptions);
        console.log("hell1");
    }

    private mounted(): void {
        this.connect();
    }

    private beforeDestroy() {
        if(this.mqttClient?.isConnected()) {
            this.mqttClient.disconnect();
        }
    }

}
</script>