<template>
    <analog-clock
      :canvasHeight="150" 
      :faceBackgroundColor="'white'" 
      :faceBorderColor="'white'" 
      :minuteTicksColor="'black'" 
      :numbersColor="'black'" 
      :hoursHandColor="'black'" 
      :minutesHandColor="'black'"
      :secondsHandColor="'red'"
      :topText="dateText()"
      :bottomText="currentWeekText()"
      :textColor="'black'"
      ></analog-clock>
    <transport></transport>
</template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-facing-decorator';
  import AnalogClock from '../components/AnalogClock.vue';
  import Transport from '../components/Transport.vue';
  
  @Component({ 
    components: { 
      AnalogClock,
      Transport
    } 
	})
  export default class TimeAndDate extends Vue {

    dateText(): string {
      const date = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const text = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
      return text;
    }

    currentWeekText(): string {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      const week = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
      const text = `w ${week < 10 ? '0' + week : week}`;
      return text;
    }

  }
  </script>
  
  <style scoped>

  </style>