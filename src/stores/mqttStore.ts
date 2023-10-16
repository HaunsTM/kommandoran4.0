import { defineStore } from 'pinia';
import type IMqttMessage from '../interfaces/iMqttMessage';

export const useMqttStore = defineStore({
  id: 'mqtt',
  state: () => {
    return {
      topicsAndMessages: new Map() as Map<string, IMqttMessage>,
    }
  },
  actions: {
    addMessage(topic: string, message: IMqttMessage) {
      this.topicsAndMessages.set(topic, message);

    },
    clearDerivedMessages() {
        this.topicsAndMessages.clear();
    },
  },
});
