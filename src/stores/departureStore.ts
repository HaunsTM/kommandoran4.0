import { defineStore } from 'pinia';
import AllTransportData from '../helpers/allTransportData';

import type IAllTransportData from '../interfaces/iAllTransportData';
import type ITransportData from '../interfaces/iTransportData';
import type IDeparture from '../interfaces/iDeparture';

export const useDepartureStore = defineStore({
  id: 'departure',
  state: () => {
    return {
      lines: new Array<ITransportData>()
    }
  },
  getters: {
    currentTransportData(state): IAllTransportData | undefined {
      const current = new AllTransportData(state.lines);
      return current;
    },
  },

  actions: {
    updateLines(newLines: Array<ITransportData>) {
      this.lines = newLines;
    },
    /*******************/

    departures(): IDeparture[] | null {
      if (this.currentTransportData) {
        return this.currentTransportData.Departures;
      }

      return null;
    },

    departureLund(): IDeparture | undefined {
      const departureLund = 
        this.currentTransportData?.Departures?.find( (d) => {
          const correctCity = d.city.toLowerCase() == 'lund';
          return correctCity
        })

      return departureLund;
    },

    departureMalmo(): IDeparture | undefined {
      const departureMalmo = 
        this.currentTransportData?.Departures?.find( (d) => {
          const correctCity = d.city.toLowerCase() == 'malmö';
          return correctCity
        })

      return departureMalmo;
    },


  },
});
