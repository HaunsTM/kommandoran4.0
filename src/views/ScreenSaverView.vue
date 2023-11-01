<template>
  <div class="container">
    <div>
        <img :src="imgSrc" alt="">
    </div>
    
    <div>
        <img :src="imgSrc" alt="">
    </div>
    
    <div>
        <time-and-date></time-and-date>
    </div>
    
    <div>
        <img :src="imgSrc" alt="">
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-facing-decorator';
import KommandoranFooterTransport from '../components/KommandoranFooterTransport.vue';
import StatusIndicator from '../components/StatusIndicator.vue';
import TimeAndDate from '../components/TimeAndDate.vue';

import { useScreenSaverImageStore } from '@/stores/screenSaverImageStore'
import { castArray } from 'lodash';

@Component({ 
  components: { 
    KommandoranFooterTransport,
    StatusIndicator,
    TimeAndDate
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

.container {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    width: 100vw;
}

.container>div {
  flex: 50%;
      max-height: 49vh;
  box-shadow: 0 0 0 1px black;
}
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }


    
</style>