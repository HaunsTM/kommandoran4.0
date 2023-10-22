import { defineStore } from 'pinia';
import Image from '@/helpers/image';
import IImage from '@/interfaces/iImage';

export const useScreenSaverImageStore = defineStore({
  id: 'image',
  state: () => {
    return {
      currentImage: null as IImage | null,
    }
  },
  getters: {
    current(state): IImage | null {
      return state.currentImage;
    },
  },

  actions: {
    updateImage(image: IImage) {
      this.currentImage = image;
    },
  },
});
