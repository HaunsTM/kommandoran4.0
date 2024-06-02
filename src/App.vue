<template>  
  <div>
    
    <v-app id="app">
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
export default class App extends Vue 
{

  async created() {
    await router.push({path: '/screen-saver'});  
  }
  
}
</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  margin: 0;
  padding: 0;
  overflow: hidden; /* Ensure there's no scrolling */
}
</style>