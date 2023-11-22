import { defineStore } from 'pinia';

import type ICalendar from '../interfaces/iCalendar';
import type IMqttMessage from '../interfaces/iMqttMessage';
import { mqttConfig } from '../mqtt.config';
import Image from '@/helpers/image';

import { useCalendarStore } from '@/stores/calendarStore'
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
      [mqttConfig.topic.calendars, initialMessage],
      [mqttConfig.topic.climate_utilityRoomFloor, initialMessage],
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
            case mqttConfig.topic.calendars:{
              
              const calendarStore = useCalendarStore();
              const currentCalendars: Array<ICalendar> = jSONMessage.map((c) => {
                return {
                  name: c.name,
                  entity_id: c.entity_id,
                  url: c.url,                  
                  events: c.events.map((e) => {
                    const current =  {
                      start: new Date(e.start.dateTime),
                      end: new Date(e.end.dateTime),
                      summary: e.summary,
                      description: e.description,
                      location: e.location
                    };
                    return current;
                  })
                };
              });
              calendarStore.updateCalendars(currentCalendars);
              break;
            }
            case mqttConfig.topic.climate_utilityRoomFloor:
                break;
            case mqttConfig.topic.climate_outdoorRoom:
                break;
            case mqttConfig.topic.climate_sjöstorpsvägen_3a:
                break;
            case mqttConfig.topic.image_screensaver: {
              const actualHostSrcImage = 
                `http://${mqttConfig.connection.hostname}:1880/endpoint/kommandoran/screensaverImage`;
              const screenSaverImageStore = useScreenSaverImageStore();
              
              const sourceImage = 
                new Image(  actualHostSrcImage, 
                            jSONMessage.originalFileName, 
                            jSONMessage.distributionTimeUTC, 
                            jSONMessage.fileSizeInBytes);
              
              screenSaverImageStore.updateImage(sourceImage);

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