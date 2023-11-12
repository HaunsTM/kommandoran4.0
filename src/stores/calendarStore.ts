import { defineStore } from 'pinia';
import ICalendar from '@/interfaces/iCalendar';
import ICalendarEvent from '@/interfaces/iCalendarEvent';

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
    getTodaysEvents(state): Array<ICalendarEvent> {
      const today = new Date(new Date().setDate(new Date().getDate() - 1));//new Date();

      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, -1);

      const todaysEvents: Array<ICalendarEvent> = state.currentCalendars
      .flatMap(calendar => calendar.events)
      .filter(event => {

          const startsToday = event.start >= startOfToday && event.start < endOfToday;
          const endsToday = event.end > startOfToday && event.end <= endOfToday;
          const spansOverWholeDay = event.start < startOfToday && endOfToday < event.end;

          const occursToday = startsToday || endsToday || spansOverWholeDay;
          return occursToday;
      })
      .sort((a, b) => a.start.getTime() - b.start.getTime());

      return todaysEvents;
    }
  },

  actions: {
    updateCalendars(calendars: Array<ICalendar>) {
      this.currentCalendars = calendars;
    },
  },
});
