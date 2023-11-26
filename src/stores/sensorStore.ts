import ISensor from '@/interfaces/iSensor';
import { defineStore } from 'pinia';

export const useSensorStore = defineStore({
  id: 'sensor',
  state: () => {
    return {
      currentHenHouseHatchLidarDataDistanceCm: -1,
      currentHenHouseHeatLamp: {} as ISensor,
    }
  },
  getters: {
    getCurrentHenHouseHatchLidarDataDistanceCm(state): number {
      return state.currentHenHouseHatchLidarDataDistanceCm;
    },
    getCurrentHenHouseHeatLamp(state): ISensor {
      return state.currentHenHouseHeatLamp;
    },
  },

  actions: {   
    updateHenHouseHatchLidarDataDistanceCm(distanceCm: number) {
      this.currentHenHouseHatchLidarDataDistanceCm = distanceCm;
    },
    updateHenHouseHeatLamp(heatLamp: ISensor) {
      this.currentHenHouseHeatLamp = heatLamp;
    },
  },
});
