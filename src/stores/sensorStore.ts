import { defineStore } from 'pinia';

export const useSensorStore = defineStore({
  id: 'sensor',
  state: () => {
    return {
      currentHenHouseHatchLidarDataDistanceCm: -1,
    }
  },
  getters: {
    getCurrentHenHouseHatchLidarDataDistanceCm(state): number {
      return state.currentHenHouseHatchLidarDataDistanceCm;
    },
  },

  actions: {   
    updateHenHouseHatchLidarDataDistanceCm(distanceCm: number) {
      this.currentHenHouseHatchLidarDataDistanceCm = distanceCm;
    },
  },
});
