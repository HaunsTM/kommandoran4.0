<template>
  <div>
    <h2>Todays events</h2>
  </div>
  <template v-if="todaysEvents().length > 0">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Summary</th>
          <th class="text-center">Start</th>
          <th class="text-center">End</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in todaysEvents()" :key="index">
          <template v-if="timePartSwedishTime(event.start) !== timePartSwedishTime(event.end)">
            <td class="text-left">{{ event.summary }}</td>
            <td class="text-center">{{ timePartSwedishTime(event.start) }}</td>
            <td class="text-center">{{ timePartSwedishTime(event.end) }}</td>
          </template>
          <template v-else>
            <td colspan="3" class="text-left">{{ event.summary }}</td>
          </template>
        </tr>
      </tbody>
    </v-table>
  </template>
  <template v-else>
    <p>None today</p>
  </template>
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

    timePartSwedishTime(date: Date) {
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Stockholm' };
      const swedishTime = new Intl.DateTimeFormat('sv-SE', options).format(date);
      return swedishTime;
    }
    
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
          /*.filter(event => {
              //filter out events that already have happened
            const eventHasEnded =  event.end < today;
            const eventWillEndInFuture = !eventHasEnded;
            return eventWillEndInFuture;
          })*/
          .sort((a, b) => a.start.getTime() - b.start.getTime());

      return todaysEvents;
    }
  }
  </script>
  
  <style scoped>
  </style>