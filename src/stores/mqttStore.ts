import { defineStore } from 'pinia';

import type ICalendar from '../interfaces/iCalendar';
import type IMqttMessage from '../interfaces/iMqttMessage';
import { mqttConfig } from '../mqtt.config';
import Image from '@/helpers/image';

import { useCalendarStore } from '@/stores/calendarStore';
import { useClimateHeatingSystemStore } from '@/stores/climateHeatingSystemStore';
import { useScreenSaverImageStore } from '@/stores/screenSaverImageStore';
import { useDepartureStore } from '@/stores/departureStore';
import { useClimateWeatherStore } from '@/stores/climateWeatherStore';
import { useSensorStore } from '@/stores/sensorStore';
import { useSettingStore } from '@/stores/settingStore';

const initialMessage:IMqttMessage = {
  timeReceived: -1,
  message: "N/A"
};

export const useMqttStore = defineStore({
  id: 'mqtt',
  state: () => ({    
    topicsAndMessages: new Map([
      [mqttConfig.topic.calendars, initialMessage],
      [mqttConfig.topic.climate_heatingSystem_henHouse, initialMessage],
      [mqttConfig.topic.climate_heatingSystem_house, initialMessage],
      [mqttConfig.topic.climate_heatingSystem_house_outdoorRoom, initialMessage],
      [mqttConfig.topic.climate_weather, initialMessage],
      [mqttConfig.topic.image_screensaver, initialMessage],
      [mqttConfig.topic.sensor_henHouse_hatch_lidar_data_distanceCm, initialMessage],
      [mqttConfig.topic.sensor_henHouse_heatLamp, initialMessage],
      [mqttConfig.topic.transport_departure, initialMessage],
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
            case mqttConfig.topic.climate_heatingSystem_henHouse: {
              const climateHeatingSystemStore = useClimateHeatingSystemStore();
              climateHeatingSystemStore.updateHenHouse(jSONMessage.entity_id, jSONMessage);
              break;
            }
            case mqttConfig.topic.climate_heatingSystem_house: {
              const climateHeatingSystemStore = useClimateHeatingSystemStore();
              climateHeatingSystemStore.updateHouse(jSONMessage.entity_id, jSONMessage);
              break;
            }
            case mqttConfig.topic.climate_heatingSystem_house_outdoorRoom: {
              const climateHeatingSystemStore = useClimateHeatingSystemStore();
              climateHeatingSystemStore.updateOutdoorRoom(jSONMessage.entity_id, jSONMessage);
              break;
            }
            case mqttConfig.topic.climate_weather: {
              const climateWeatherStore = useClimateWeatherStore();
              climateWeatherStore.updateClimateWeather(jSONMessage);
              break;
            } 
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
            case mqttConfig.topic.sensor_henHouse_hatch_lidar_data_distanceCm: {
              const sensorStore = useSensorStore();
              sensorStore.updateHenHouseHatchLidarDataDistanceCm(jSONMessage);
              break;
            } 
            case mqttConfig.topic.sensor_henHouse_heatLamp: {
              const sensorStore = useSensorStore();
              sensorStore.updateHenHouseHeatLamp(jSONMessage);
              break;
            } 
            case mqttConfig.topic.settings: {
              const settingStore = useSettingStore();
              settingStore.update(jSONMessage);
              break;
            } 
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