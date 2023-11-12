<template>
  <table>
    <thead>
      <tr>
        <th>Start</th>
        <th>End</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(event, index) in todaysEvents()" :key="index">
        <td>{{ event.start }}</td>
        <td>{{ event.end }}</td>
        <td>{{ event.summary }}</td>
      </tr>
    </tbody>
  </table>
</template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-facing-decorator';
  import ICalendarEvent from '@/interfaces/iCalendarEvent';
  import { useCalendarStore } from '@/stores/calendarStore';
  @Component({ 
    components: {
    } 
	})
  export default class Calendar extends Vue {

    private readonly calendarStore = useCalendarStore();

    todaysEvents(): Array<ICalendarEvent> {
      const today = new Date();

      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, -1);

      const todaysEvents: Array<ICalendarEvent> = 
        this.calendarStore.currentCalendars
          .flatMap(calendar => calendar.events)
          .filter(event => {
              //filter out todays events
              const startsToday = event.start >= startOfToday && event.start < endOfToday;
              const endsToday = event.end > startOfToday && event.end <= endOfToday;
              const spansOverWholeDay = event.start < startOfToday && endOfToday < event.end;

              const occursToday = startsToday || endsToday || spansOverWholeDay;
              return occursToday;
          })
          .filter(event => {
              //filter out events that already have happened
            const eventHasEnded =  event.end < today;
            const eventWillEndInFuture = !eventHasEnded;
            return eventWillEndInFuture;
          })
          .sort((a, b) => a.start.getTime() - b.start.getTime());

      return todaysEvents;
    }
  }
  </script>
  
  <style scoped>

  </style>