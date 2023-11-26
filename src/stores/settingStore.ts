import { defineStore } from 'pinia';

export const useSettingStore = defineStore({
  id: 'setting',
  state: () => {
    return {
      currentSettings: {},
    }
  },
  getters: {
    getCurrent(state): any {
      return state.currentSettings;
    },
  },

  actions: {   
    update(settings: any) {
      this.currentSettings = settings;
    },
  },
});
