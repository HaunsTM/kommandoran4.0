<template>
  <div>
    <kommandoran-footer-transport></kommandoran-footer-transport>
    <status-indicator></status-indicator>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import KommandoranFooterTransport from '../components/KommandoranFooterTransport.vue';
import StatusIndicator from '../components/StatusIndicator.vue';


@Component({ 
  components: { 
    KommandoranFooterTransport,
    StatusIndicator
  } 
})
export default class ScreenSaverView extends Vue 
{ 
}

</script>
