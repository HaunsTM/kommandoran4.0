import { defineStore } from 'pinia';
import type IMqttMessage from '../interfaces/iMqttMessage';
import { mqttConfig } from '../mqtt.config';

export const useTransportDataStore = defineStore({
  id: 'transportData',
  state: () => {
    return {
      topicsAndMessages: new Map() as Map<string, IMqttMessage>,
    }
  },
  actions: {
    get() {
      this.topicsAndMessages.get(mqttConfig.topic.transport_departure);

    },
  },
});
