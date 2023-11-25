import { defineStore } from 'pinia';
import IClimateWeather from "@/interfaces/IClimateWeather";

export const useClimateWeatherStore = defineStore({
  id: 'climateWeather',
  state: () => {
    return {
      currentClimateWeather: {} as IClimateWeather,
    }
  },
  getters: {
    getCurrentClimateWeather(state): IClimateWeather {
      return state.currentClimateWeather;
    },
  },

  actions: {   
    updateClimateWeather(climateWeather: IClimateWeather) {
      this.currentClimateWeather = climateWeather;
    },
  },
});