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
      return this.calendarStore.getTodaysEvents
    }

  }
  </script>
  
  <style scoped>

  </style>