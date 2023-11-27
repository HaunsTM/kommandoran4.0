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
      :topText="swedishTime"
      :bottomText="'Hauns™'"
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

    timerReference!: number;
    
    swedishTime: string = this.getSwedishTime();

    getSwedishTime(): string {
      // Create a date object for the current time in Sweden
      const date = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Stockholm"}));

      // Get the hours and minutes, padding with zeros if necessary
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      // Return the time in HH:mm format
      return `${hours}:${minutes}`;
    }

    
    mounted() {
      this.timerReference = setInterval(() => {
        this.swedishTime = this.getSwedishTime();
      }, 1000);
    }
  
    beforeUnmount() {
      if (this.timerReference) {
        clearInterval(this.timerReference);
      }
    }

  }
  </script>
  
  <style scoped>

  </style>