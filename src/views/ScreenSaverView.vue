<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row no-gutters class="fill-height">
      <v-col cols="6" class="half-screen">
        <div class="content-container">
          <v-img :src="imgSrc" alt="" contain height="100%" width="100%"></v-img>
        </div>
      </v-col>
      <v-col cols="6" class="half-screen">
        <!-- Content for second column in first row goes here -->
        <div class="content-container">
          <time-and-date class="content"></time-and-date>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="fill-height">
      <v-col cols="6" class="half-screen">
        <!-- Content for first column in second row goes here -->
        <div class="content-container">
          <climate class="content"></climate>          
        </div>
      </v-col>
      <v-col cols="6" class="half-screen">
        <!-- Content for second column in second row goes here -->
        <div class="content-container">
          <calendar class="content"></calendar>          
        </div>
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
.fill-height {
  height: 100vh; /* 100% of the viewport height */
}

.half-screen {
  height: 50vh; /* 50% of the viewport height */
  overflow: hidden; /* Ensure there's no scrolling */
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 100%;
  padding: 0.2rem;
}

.content {
  max-width: 100%; /* Maximum width is 100% of the parent's width */
  max-height: 100%; /* Maximum height is 100% of the parent's height */
}
</style>
