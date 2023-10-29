import { defineStore } from 'pinia';
import Image from '@/helpers/image';
import IImage from '@/interfaces/iImage';

export const useScreenSaverImageStore = defineStore({
  id: 'image',
  state: () => {
    return {
      currentImage: {} as IImage,
    }
  },
  getters: {
    getCurrentImage(state): IImage {
      return state.currentImage;
    },
  },

  actions: {
    updateImage(image: IImage) {
      this.currentImage = image;
    },
  },
});
