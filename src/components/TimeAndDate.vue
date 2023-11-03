<template>
    <analog-clock 
      :canvasWidth="250" 
      :canvasHeight="250" 
      :faceBackgroundColor="'white'" 
      :faceBorderColor="'white'" 
      :minuteTicksColor="'black'" 
      :numbersColor="'black'" 
      :hoursHandColor="'black'" 
      :minutesHandColor="'black'"
      :secondsHandColor="'red'"
      :faceText="clockText()"
      :faceTextSizeFont="'16px Arial'"
      :faceTextColor="'black'"
      ></analog-clock>
   
</template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-facing-decorator';
  import AnalogClock from '../components/AnalogClock.vue';

  import moment from "moment";
  @Component({ 
	components: { 
		AnalogClock
	} 
	})
  export default class TimeAndDate extends Vue {

	clockText(): string {
    const text = moment().format('ddd D MMM, \n[w] ww');
		return text;
  }

  }
  </script>
  
  <style scoped>

  </style>