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
    private mqttStore = useMqttStore();

    private readonly topicsForSubscription = 
        [
            mqttConfig.topic.calendars,
            mqttConfig.topic.climate_heatingSystem_henHouse,
            mqttConfig.topic.climate_heatingSystem_house,
            mqttConfig.topic.climate_heatingSystem_house_outdoorRoom,
            mqttConfig.topic.climate_weather,
            mqttConfig.topic.image_screensaver,
            mqttConfig.topic.sensor_henHouse_hatch_lidar_data_distanceCm,
            mqttConfig.topic.sensor_henHouse_heatLamp,
            mqttConfig.topic.settings,
            mqttConfig.topic.transport_departure,
        ];

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
                for (const topic of this.topicsForSubscription) {
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
        try {  
            const mqttMessage: IMqttMessage = {
                timeReceived: Date.now(),
                message: message.payloadString
            };
            const topic = message.destinationName;
            this.mqttStore.addMessage(topic, mqttMessage);
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
        //this.startMqttService(mqttConfig.clientOptions);
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