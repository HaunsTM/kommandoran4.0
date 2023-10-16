import { defineStore } from 'pinia';
import type IMqttMessage from '../interfaces/iMqttMessage';
import type IAllTransportData from '../interfaces/iAllTransportData';
import type IDeparture from '../interfaces/iDeparture';
import { mqttConfig } from '../mqtt.config';

export const useDepartureDataStore = defineStore({
  id: 'transportData',
  state: () => {
    return {
      topicsAndMessages: new Map() as Map<string, IMqttMessage>,
    }
  },
  actions: {
    getAllTransportData(): IAllTransportData | undefined {
      const transportDataMqttMessage = this.topicsAndMessages.get(mqttConfig.topic.transport_departure);
      const transportDataMessageString = transportDataMqttMessage?.message;
      if (transportDataMessageString) {
        const transportDataMessage = JSON.parse(transportDataMessageString) as IAllTransportData;
        return transportDataMessage;
      }
    },
  },
});

 