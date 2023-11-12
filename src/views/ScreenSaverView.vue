<template>
  <div class="container">
    <div>
      <div>
        <img class="screen-saver-image" :src="imgSrc" alt="">
      </div>
      <div>
        <time-and-date></time-and-date>
      </div>
    </div>
    
    <div>
      <div>   
      </div>
      
      <div>
        <calendar></calendar>
      </div>      
    </div>

    
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-facing-decorator';
import StatusIndicator from '../components/StatusIndicator.vue';
import TimeAndDate from '../components/TimeAndDate.vue';
import Calendar from '../components/Calendar.vue';

import { useScreenSaverImageStore } from '@/stores/screenSaverImageStore'
import { castArray } from 'lodash';

@Component({ 
  components: {
    Calendar,
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
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.container > div {
  display: flex;
  flex-direction: row;
}

.container > div > div {
  flex: 1;
  display: flex;
  width: 50vw;
  max-width: 50vw;
  height: 50vh;
  max-height: 50vh;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
}
    img {
      width: auto;
      height: 100%;
    }


    
</style>