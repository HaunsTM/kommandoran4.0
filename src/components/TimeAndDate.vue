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
  import moment from "moment";
  @Component({ 
    components: { 
      AnalogClock,
      Transport
    } 
	})
  export default class TimeAndDate extends Vue {

    dateText(): string {
      const text = moment().format('ddd D MMM');
      return text;
    }

    currentWeekText(): string {
      const text = moment().format('[w] ww');
      return text;
    }

  }
  </script>
  
  <style scoped>

  </style>