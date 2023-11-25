import { defineStore } from 'pinia';
import IHeatingSystemDictionary from '@/interfaces/iHeatingSystemDictionary';
import IHeatingSystem from '@/interfaces/iHeatingSystem';

export const useClimateHeatingSystemStore = defineStore({

  id: 'climateHeatingSystem',

  state: () => {
    return {
      currentHeatingSystemHenHouse: {} as IHeatingSystemDictionary,
      currentHeatingSystemsHouse: {} as IHeatingSystemDictionary,
      currentHeatingSystemOutdoorRoom: {} as IHeatingSystemDictionary,
    }
  },

  getters: {
    getCurrentHenHouse(state): IHeatingSystemDictionary {
      return state.currentHeatingSystemHenHouse;
    },
    getCurrentHouse(state): IHeatingSystemDictionary {
      return state.currentHeatingSystemsHouse;
    },
    getCurrentOutdoorRoom(state): IHeatingSystemDictionary {
      return state.currentHeatingSystemOutdoorRoom;
    },
  },

  actions: {   
    updateHenHouse(entity_id: string, heatingSystem: IHeatingSystem) {
      this.currentHeatingSystemHenHouse[entity_id] = heatingSystem;
    },
  
    updateHouse(entity_id: string, heatingSystem: IHeatingSystem) {
      this.currentHeatingSystemsHouse[entity_id] = heatingSystem;
    },
    
    updateOutdoorRoom(entity_id: string, heatingSystem: IHeatingSystem) {
      this.currentHeatingSystemOutdoorRoom[entity_id] = heatingSystem;
    },
  },
  
});