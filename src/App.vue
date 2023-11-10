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
  mounted() {
    window.addEventListener('resize', () => {
      this.$forceUpdate();
    });
  }
}

</script>
<style>
  div {
    padding: 0;
    margin: 0;

    color: white;
    background-color: black;
  }
</style>
