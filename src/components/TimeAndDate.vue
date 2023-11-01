<template>
    <div class="clock-container">
      <div class="clock">
		<div v-for="n in 60" :key="n" class="markings" :style="{ transform: `rotate(${n * 6}deg)` }">
          <div :class="getTickMarkClass(n)"></div>
        </div>
        <div id="div-hour" ref="div-hour">
          <div>
          </div>
        </div>
        <div id="div-minute" ref="div-minute">
          <div></div>
        </div>
        <div id="div-second" ref="div-second">
          <div></div>
        </div>
        <span class="ctr"></span>
      </div>
    </div>
  
</template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-facing-decorator';
  /**https://www.prowaretech.com/articles/current/javascript/analog-clock#! */
  @Component
  export default class Clock extends Vue {
    private timer: number | undefined;
  
    mounted() {
      this.timer = setInterval(this.setDate, 1000);
      this.setDate();
    }
  
    beforeUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  
    setDate() {
      const now = new Date();
  
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 6.0;
      (this.$refs['div-second'] as HTMLElement).style.transform = `rotate(${secondsDegrees}deg)`;
  
      const mins = now.getMinutes();
      const minsDegrees = ((mins / 60) * 360) + 6.0 * now.getSeconds() / 60;
      (this.$refs['div-minute'] as HTMLElement).style.transform = `rotate(${minsDegrees}deg)`;
  
      const hour = now.getHours();
      const hourDegrees = ((hour / 12) * 360) + 30.0 * now.getMinutes() / 60;
      (this.$refs['div-hour'] as HTMLElement).style.transform = `rotate(${hourDegrees}deg)`;
    }

	getTickMarkClass(currentMinute: number): string {
		let numberOfHours = 12;
		const indexOffset = 1;
		// Create an empty array of the defined size
		let shouldHaveHourMarking = new Array(numberOfHours);
		shouldHaveHourMarking = shouldHaveHourMarking.fill(0).map((_, index) => (index + indexOffset) * 60/12);

		if (shouldHaveHourMarking.includes(currentMinute)) {
			return "hour-marking";
		} else {
			return "minute-marking";
		}
	}
  }
  </script>
  
  <style scoped>
    .clock-container {
			background-color: midnightblue;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 100%;
		}
		.clock {
			position: relative;
			overflow: hidden;
			background-color: white;
			height: 25vmin;
			width: 25vmin;
			border-radius: 50%;
			
			border:1px solid black;  
			
		}
			.clock div {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background-color: transparent;
			}
				.clock div div {
					left: 50%;
					width: 0;
				}
			
			.clock .ctr {
				width: 3%;
				height: 3%;
				border-radius: 50%;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}

		#div-hour div {
			top: 20%;
			height: 35%;
			border-left: 4px solid black;
			margin-left: -1px;
		}

		#div-minute div {
			top: 10%;
			height: 45%;
			border-left: 4px solid black;
			margin-left: -1px;
		}

		#div-second div {
			top: 5%;
			height: 45%;
			border-left: 2px solid red;
		}
		.markings {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		}

		.markings div {
		position: absolute;
		bottom: 50%;
		left: 50%;
		width: 4px;
		height: 2%;
		}

		.hour-marking {
			background-color: black;
			border: 3px solid black;
		}
		.minute-marking {
			background-color: gray;
			border: 1px solid gray;

		}


  </style>