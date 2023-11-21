<template>  
  <div>
    
    <v-app>
      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>

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

@Component({ 
  components: { 
    ServiceMqttHomeAssistant
  } 
})
export default class ScreenSaverView extends Vue 
{
  mounted() {
    window.addEventListener('resize', () => {
      this.$forceUpdate();
    });
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
</style>
