<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card height="100%">
      <v-card-title>
        Todays events
      </v-card-title>
      <v-card-subtitle>
        {{ todayText() }}, week {{ currentWeek() }}
      </v-card-subtitle>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Summary</th>
              <th class="text-center">Start</th>
              <th class="text-center">End</th>
            </tr>
          </thead>
          <tbody class="full-height">
            <template v-if="tempDisplayedEvents.length > 0">
              <tr v-for="(event, index) in tempDisplayedEvents" :key="index">
                <template v-if="timePartSwedishTime(event.start) !== timePartSwedishTime(event.end)">
                  <td class="text-left">{{ event.summary }}</td>
                  <td class="text-center">{{ timePartSwedishTime(event.start) }}</td>
                  <td class="text-center">{{ timePartSwedishTime(event.end) }}</td>
                </template>
                <template v-else>
                  <td colspan="3" class="text-center">{{ event.summary }}</td>
                </template>
              </tr>
            </template>
            <template v-else>
              <td colspan="3" class="text-center">Nothing today</td>
            </template>
          </tbody>
        </v-table>
    </v-card>
  </v-container>
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
    private loopCalendarEventsTimer: number | undefined;
    tempDisplayedEvents: Array<ICalendarEvent> = [];
    private reactiveDateTimeTimer: number | undefined;
    private reactiveCurrentDateTime = new Date();
    
    private readonly maxNumberOfSimultanouslyDisplayedCalendarEvents = 3;
    private readonly timeToDisplaySimultanouslyDisplayedCalendarEventsBeforeSwitchMs = 5*1000;

    updateCurrentReactiveDateTime() {
      this.reactiveCurrentDateTime = new Date();
    }

    timePartSwedishTime(date: Date) {
      const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Stockholm' };
      const swedishTime = new Intl.DateTimeFormat('sv-SE', options).format(date);
      return swedishTime;
    }
    
    todaysAllCalendarEvents(): Array<ICalendarEvent> {
      const today = new Date();

      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, -1);

      const todaysEvents: Array<ICalendarEvent> = 
        this.calendarStore.currentCalendars
          .filter( (calendar) => {
            const unwantedCalendars = ["Week numbers"];
            if (unwantedCalendars.includes(calendar.name)) {
              return false;
            } else {
              return true;
            }
          })
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
    

    todayText(): string {

      const date =  this.reactiveCurrentDateTime;
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const text = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;

      return text;
    }

    currentWeek(): string {
      // returns week number 01, 02, 10, 27 etc

      const date =  this.reactiveCurrentDateTime;
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      const week = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
      const text = `${week < 10 ? '0' + week : week}`;

      return text;
    }

    setTempDisplayedCalendarEvents() {
      let index = 0;
      this.loopCalendarEventsTimer = setInterval(() => {
        const events = this.todaysAllCalendarEvents ();
        this.tempDisplayedEvents = events.slice(index, index + this.maxNumberOfSimultanouslyDisplayedCalendarEvents);
        index = (index + this.maxNumberOfSimultanouslyDisplayedCalendarEvents) % events.length;
      }, this.timeToDisplaySimultanouslyDisplayedCalendarEventsBeforeSwitchMs);
    }

    created() {
      
      this.reactiveDateTimeTimer = setInterval(this.updateCurrentReactiveDateTime, 1000); // Update every second
      // When the component is created, start the loop
      this.setTempDisplayedCalendarEvents();
    }

    beforeDestroy() {
      
      if (this.loopCalendarEventsTimer) {
        clearInterval(this.loopCalendarEventsTimer);
      }
      if (this.reactiveDateTimeTimer) {
        clearInterval(this.reactiveDateTimeTimer);
      }
    }
  }
</script>
  
<style scoped>
</style>