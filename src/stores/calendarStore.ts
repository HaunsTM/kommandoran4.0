import { defineStore } from 'pinia';
import ICalendar from '@/interfaces/iCalendar';

export const useCalendarStore = defineStore({
  id: 'calendar',
  state: () => {
    return {
      currentCalendars: [] as Array<ICalendar>,
    }
  },
  getters: {
    getCurrentCalendars(state): Array<ICalendar> {
      return state.currentCalendars;
    },
  },

  actions: {   
    updateCalendars(calendars: Array<ICalendar>) {
      this.currentCalendars = calendars;
    },
  },
});
