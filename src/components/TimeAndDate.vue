<template>
	<h3>{{ getDate() }}</h3>
    <analog-clock></analog-clock>
   
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

	getDate(): string {
        const dateString = moment().format('dddd, YYYY-MM-DD, [week] ww');
		return dateString;
    }

  }
  </script>
  
  <style scoped>

  </style>