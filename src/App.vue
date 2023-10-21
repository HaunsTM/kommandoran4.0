<template>
  <div>    
    <router-view/>
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
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
