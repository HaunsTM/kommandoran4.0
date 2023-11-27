<template>
  <v-container fluid>
    <v-row no-gutters class="fill-height">
      <v-col cols="5" class="half-screen">
        <!-- Content for first column in first row goes here -->
        <img class="screen-saver-image " :src="imgSrc" alt="">
      </v-col>
      <v-col cols="5" class="half-screen">
        <!-- Content for second column in first row goes here -->
        <time-and-date></time-and-date>
      </v-col>
    </v-row>
    <v-row no-gutters class="fill-height">
      <v-col cols="5" class="half-screen">
        <!-- Content for first column in second row goes here -->
        <climate></climate>
      </v-col>
      <v-col cols="5" class="half-screen">
        <!-- Content for second column in second row goes here -->
        <calendar></calendar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-facing-decorator';
import StatusIndicator from '../components/StatusIndicator.vue';
import TimeAndDate from '../components/TimeAndDate.vue';
import Calendar from '../components/Calendar.vue';
import Climate from '../components/Climate.vue';

import { useScreenSaverImageStore } from '@/stores/screenSaverImageStore'
import { castArray } from 'lodash';

@Component({ 
  components: {
    Calendar,
    Climate,
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
.screen-saver-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.half-screen {
  height: 50vh;
  width: 50vw;
}
</style>