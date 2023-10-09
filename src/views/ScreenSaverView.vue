<template>
  <div>
    <service-mqtt-home-assistant></service-mqtt-home-assistant>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';
import ServiceMqttHomeAssistant from '../components/ServiceMqttHomeAssistant.vue';


@Component({ 
  components: { ServiceMqttHomeAssistant } 
})
export default class ScreenSaverView extends Vue 
{

 
  mounted() {
    console.log("Mounted ScreenSaverView")
  }

}

</script>
