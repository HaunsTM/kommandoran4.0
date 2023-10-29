<template>
  <div>
    <div class="image-container">
        <img :src="imgSrc" alt="">
    </div>
    
    <kommandoran-footer-transport></kommandoran-footer-transport>
    <status-indicator></status-indicator>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-facing-decorator';
import KommandoranFooterTransport from '../components/KommandoranFooterTransport.vue';
import StatusIndicator from '../components/StatusIndicator.vue';

import { mqttConfig } from '../mqtt.config';
import { useScreenSaverImageStore } from '@/stores/screenSaverImageStore'
import { castArray } from 'lodash';

@Component({ 
  components: { 
    KommandoranFooterTransport,
    StatusIndicator
  } 
})
export default class ScreenSaverView extends Vue 
{ 
  private screenSaverImageStore = useScreenSaverImageStore();
  imgSrc = "";

  get distributionTimeUTC() :  number {
    try {
      const sourceImageFile = this.screenSaverImageStore.getCurrentImage?.sourceImageFile();
      const distributionTimeUTC = sourceImageFile.distributionTimeUTC;
      return distributionTimeUTC;
    
    } catch (error) {
      return -1;
    } 
  }
  
  @Watch('distributionTimeUTC')
  async getNewImgSrc(): Promise<void>  {
    const currentImage = this.screenSaverImageStore.getCurrentImage;
    if (currentImage) {
        const receivedImage = await currentImage.receivedImage();
        const sizeInKBytes = receivedImage.sizeInKBytes;
        this.imgSrc = receivedImage.src;
        console.log(sizeInKBytes);

    } else {
      this.imgSrc = "";
    }
  }
}

</script>

<style scoped>

    .card 
        {
        position: fixed;
        top:0;
        left: 0;
        /**/        
        padding-top: 2rem;
        height: calc(100vh - 47px);
        max-height: calc(100vh - 47px);
    }

    .image-container {
        display: flex;
        justify-content: center;
        width: 100vw;
    }
    img {

        height: calc(100vh - 160px);
    }


    
</style>