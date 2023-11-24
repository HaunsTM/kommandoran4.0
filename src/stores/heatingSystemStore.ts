import { defineStore } from 'pinia';
import IHeatingSystemDictionary from '@/interfaces/iHeatingSystemDictionary';

export const useHeatingSystemStore = defineStore({
  id: 'heatingSystem',
  state: () => {
    return {
      currentHeatingSystems: {} as IHeatingSystemDictionary,
    }
  },
  getters: {
    getCurrentHeatingSystems(state): IHeatingSystemDictionary {
      return state.currentHeatingSystems;
    },
  },

  actions: {   
    updateHeatingSystems(heatingSystems: IHeatingSystemDictionary) {
      this.currentHeatingSystems = heatingSystems;
    },
    
    updateHeatingSystemValue(entity_id: string, heatingSystem: { attributes: { current_temperature: number }; last_changed: string; last_updated: string; state: string; timeSinceChangedMs: number; }) {
      this.currentHeatingSystems[entity_id] = heatingSystem;
    },
  },
});