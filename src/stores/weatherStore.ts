import { defineStore } from 'pinia';
import IWeather from '@/interfaces/iWeather';

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => {
    return {
      currentWeather: {} as IWeather,
    }
  },
  getters: {
    getCurrentWeather(state): IWeather {
      return state.currentWeather;
    },
  },

  actions: {   
    updateWeather(weather: IWeather) {
      this.currentWeather = weather;
    },
  },
});