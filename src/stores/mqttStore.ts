import { defineStore } from 'pinia';

import type IMqttMessage from '../interfaces/iMqttMessage';
import { mqttConfig } from '../mqtt.config';
import Image from '@/helpers/image';

import { useScreenSaverImageStore } from '@/stores/screenSaverImageStore'
import { useDepartureStore } from '@/stores/departureStore'

const initialMessage:IMqttMessage = {
  timeReceived: -1,
  message: "N/A"
};

export const useMqttStore = defineStore({
  id: 'mqtt',
  state: () => ({    
    topicsAndMessages: new Map([
      [mqttConfig.topic.climate_utilityRoomFloor, initialMessage],
      [mqttConfig.topic.climate_mainThermostat, initialMessage],
      [mqttConfig.topic.climate_outdoorRoom, initialMessage],
      [mqttConfig.topic.climate_sjöstorpsvägen_3a, initialMessage],
      [mqttConfig.topic.image_screensaver, initialMessage],
      [mqttConfig.topic.sound_play_file, initialMessage],
      [mqttConfig.topic.transport_departure, initialMessage]
    ]) as Map<string, IMqttMessage>,
    lastRecievedMqttMessage: -1 as number
  }),
  getters: {
    getTopicsAndMessages(state): Map<string, IMqttMessage> {
      return state.topicsAndMessages;
    },
    getLastRecievedMqttMessage(state): number {
      return state.lastRecievedMqttMessage;
    },
  },
  actions: {
    getMessageByTopic(topic: string): IMqttMessage {
      const mqttMessage = this.getTopicsAndMessages.get(topic) as IMqttMessage;
      return mqttMessage;
    },
    addMessage(topic: string, payload: IMqttMessage) {
      this.topicsAndMessages.set(topic, payload);
      this.lastRecievedMqttMessage = payload.timeReceived;
      
      try {
        const jSONMessage = JSON.parse(payload.message);

        switch (topic) {
            case mqttConfig.topic.climate_utilityRoomFloor:
                break;
            case mqttConfig.topic.climate_mainThermostat:
                break;
            case mqttConfig.topic.climate_outdoorRoom:
                break;
            case mqttConfig.topic.climate_sjöstorpsvägen_3a:
                break;
            case mqttConfig.topic.image_screensaver: {
              const actualHostSrcImage = 
                `http://${mqttConfig.connection.hostname}:8123/local/kommandoran/screensaver_image.jpg`;
              const screenSaverImageStore = useScreenSaverImageStore();
              
              const screensaverImage = 
                new Image(actualHostSrcImage, jSONMessage.originalFileName, jSONMessage.distributionTimeUTC);
              
              screenSaverImageStore.updateImage(screensaverImage);

              break;
            }
            case mqttConfig.topic.sound_play_file:
                break;
            case mqttConfig.topic.transport_departure: {
              const departureStore = useDepartureStore();
              const lines = jSONMessage.lines;
              departureStore.updateLines(lines);
              break;
            }                
            default:
        }

      } catch (error) {
        console.error(error);
      }
    },
  }
})