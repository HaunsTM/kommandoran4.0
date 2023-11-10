<template>

    <canvas id="clock" ref="clock" :width="canvasWidth" :height="canvasHeight" :style="canvasStyle"></canvas>
   
</template>
  
  <script lang="ts">
  import { Component, Prop, Vue } from 'vue-facing-decorator';
  /**https://www.prowaretech.com/articles/current/javascript/analog-clock#! */
  @Component
  export default class AnalogClock extends Vue {
    timerReference!: number;
    
    @Prop({ default: 100 }) canvasHeight!: number;
    // @Prop({ default: 100 }) canvasWidth!: number;
    canvasWidth = this.canvasHeight;

    @Prop({ default: "white" }) faceBackgroundColor!: string;
    @Prop({ default: "white" }) faceBorderColor!: string;
    
    @Prop({ default: "black" }) minuteTicksColor!: string;

    @Prop({ default: "black" }) numbersColor!: string;

    @Prop({ default: "black" }) hoursHandColor!: string;
    @Prop({ default: "black" }) minutesHandColor!: string;
    @Prop({ default: "red" }) secondsHandColor!: string;
    
    @Prop({ default: "NO_TOP_TEXT" }) topText!: string;
    @Prop({ default: "NO_BOTTOM_TEXT" }) bottomText!: string;
    @Prop({ default: "black" }) textColor!: string;
    
    get canvasStyle() {
        return {
            width: this.canvasWidth + 'px',
            height: this.canvasHeight + 'px',
        };
    }

    mounted() {
      this.timerReference = setInterval(this.drawClock, 1000);
      this.drawClock();
    }
  
    beforeUnmount() {
      if (this.timerReference) {
        clearInterval(this.timerReference);
      }
    }

    private get clockCanvas(): HTMLCanvasElement {
        const canvas = (this.$refs['clock'] as HTMLCanvasElement);
        return canvas;
    }
    
    private get clockRadius(): number {
        const canvas = this.clockCanvas;
        
        const radius = canvas.height / 2 * 0.95;
        return radius;
    }

    private get ctx():CanvasRenderingContext2D | null {
        const canvas = (this.$refs['clock'] as HTMLCanvasElement);
        const ctx = canvas.getContext('2d');

        // Set the radius of the clock
        const radius = canvas.height / 2;
        ctx?.translate(radius, radius);

        return ctx;
    }
    
    private drawClock() {
      const ctx = this.ctx;
      if (ctx) {
        ctx.clearRect(-this.clockRadius, -this.clockRadius, this.clockCanvas.width, this.clockCanvas.height);
        this.drawFace(ctx, this.clockRadius);
        this.drawMinuteTicks(ctx, this.clockRadius); 
        this.drawNumbers(ctx, this.clockRadius);
        this.drawTime(ctx, this.clockRadius);
        this.drawText(this.topText, ctx, {x: 0, y: -this.clockRadius / 3.5}, this.clockRadius);
        this.drawText(this.bottomText, ctx, {x: 0, y: this.clockRadius / 3.5}, this.clockRadius);
      }
    }

    private drawFace(ctx:CanvasRenderingContext2D, radius: number) {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2*Math.PI);
      
      // Fill the circle with white color
      ctx.fillStyle = this.faceBackgroundColor;
      ctx.fill();
      
      // Draw the border
      ctx.strokeStyle = this.faceBorderColor;
      ctx.lineWidth = radius*0.1;
      ctx.stroke();
    }

    private drawMinuteTicks(ctx:CanvasRenderingContext2D, radius: number) {
      let ang;
      for(let num = 0; num < 60; num++){
        ang = num * Math.PI / 30;
        ctx.beginPath();
        ctx.rotate(ang);

        // If the current minute is a multiple of 5, draw a thicker line
        if (num % 5 === 0) {
            ctx.moveTo(0, -radius*0.95); // Start the line 2px inside the border
            ctx.lineWidth = 6;
        } else {
            ctx.moveTo(0, -radius*0.97); // Start the line 2px inside the border
            ctx.lineWidth = 2;
        }

        ctx.lineTo(0, -radius); // End the line at the border

        ctx.strokeStyle = this.minuteTicksColor;
        ctx.stroke();
        ctx.rotate(-ang);
      }    
    }
    
    private drawNumbers(ctx:CanvasRenderingContext2D, radius: number) {
      let ang;
      let num;
      ctx.font = "bold " + radius*0.2 + "px arial";
      ctx.textBaseline="middle";
      ctx.textAlign="center";
      ctx.fillStyle = this.numbersColor;
      for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.75);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.75);
        ctx.rotate(-ang);
      }
    }
    
    private drawTime(ctx:CanvasRenderingContext2D, radius: number){
      let now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      //hour
      hour=hour%12;
      hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
      this.drawHand(ctx, hour, radius*0.5, radius*0.07, this.hoursHandColor);
      //minute
      minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
      this.drawHand(ctx, minute, radius*0.8, radius*0.07, this.minutesHandColor);
      // second
      second=(second*Math.PI/30);
      this.drawHand(ctx, second, radius*0.9, radius*0.02, this.secondsHandColor);
    }

    private drawHand(ctx, pos, length, width, color) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      ctx.moveTo(0,0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    }

    private drawText(text: string, ctx: CanvasRenderingContext2D, pos: {x: number, y: number}, radius: number) {
      ctx.font = radius*0.175 + "px arial";
      ctx.fillStyle = this.textColor;
      ctx.fillText(text, pos.x, pos.y);
    }
  }
  </script>
  
<style scoped>
  #clock {
    background-color: inherit;
    display: block;
    margin: 0 auto;
  }

</style>