<template>  
  <div>
    
    <v-app>
      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid class="ma-0 pa-0">

          <!-- If using vue-router -->
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
    <service-mqtt-home-assistant></service-mqtt-home-assistant>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import ServiceMqttHomeAssistant from './components/ServiceMqttHomeAssistant.vue';
import router from './router'; // Make sure to import your router

@Component({ 
  components: { 
    ServiceMqttHomeAssistant
  } 
})
export default class ScreenSaverView extends Vue 
{
  private idleTime = 0;
  private idleInterval: number | undefined;
  private idleTimeLimit = 30;
  private wasIdle = false;

  private resetIdleTime() {
    this.idleTime = 0;
    if (this.wasIdle) { // Only log "User becomes active" if the user was previously idle
      this.userBecomesActive();
      this.wasIdle = false; // Reset the wasIdle flag
    }
  }

  private incrementIdleTime() {
    this.idleTime += 1;
    if (this.idleTime >= this.idleTimeLimit) {
      console.log('User is idle');
      this.userBecomesInactive();
      this.wasIdle = true; // Set the wasIdle flag to true
      if (this.idleInterval) {
        clearInterval(this.idleInterval);
      }
      // Start the timer again when the user becomes active
      window.addEventListener('mousemove', this.restartIdleTimer, false);
      window.addEventListener('mousedown', this.restartIdleTimer, false);
      window.addEventListener('keypress', this.restartIdleTimer, false);
      window.addEventListener('touchmove', this.restartIdleTimer, false);
    }
  }

  private restartIdleTimer() {
    this.resetIdleTime();
    this.idleInterval = setInterval(() => this.incrementIdleTime(), 1000); // 1 second
    // Remove the event listeners
    window.removeEventListener('mousemove', this.restartIdleTimer, false);
    window.removeEventListener('mousedown', this.restartIdleTimer, false);
    window.removeEventListener('keypress', this.restartIdleTimer, false);
    window.removeEventListener('touchmove', this.restartIdleTimer, false);
  }

  private async userBecomesActive() {
    // Your custom logic here
    await router.push({path: '/home-assistant'});
  }

  private async userBecomesInactive() {
    // Your custom logic here
    console.log('User becomes inactive');
    await router.push({path: '/screen-saver'});
  }

  mounted() {
    window.addEventListener('resize', () => {
      this.$forceUpdate();
    });

    window.addEventListener('mousemove', this.resetIdleTime, false);
    window.addEventListener('mousedown', this.resetIdleTime, false);
    window.addEventListener('keypress', this.resetIdleTime, false);
    window.addEventListener('touchmove', this.resetIdleTime, false);

    this.idleInterval = setInterval(() => this.incrementIdleTime(), 1000); // 1 second
  }

  beforeDestroy() {
    window.removeEventListener('mousemove', this.resetIdleTime, false);
    window.removeEventListener('mousedown', this.resetIdleTime, false);
    window.removeEventListener('keypress', this.resetIdleTime, false);
    window.removeEventListener('touchmove', this.resetIdleTime, false);

    if (this.idleInterval) {
      clearInterval(this.idleInterval);
    }
  }
}
</script>

<style>
  v-app {
    padding: 0;
    margin: 0;
    
    height: 100vh;
    width: 100vw;
    max-height: 100vh;
    max-width: 100vw;
  }
  .container{
     max-width: 100vw;
     padding:0px;
  }
</style>
