<template>
  <v-card
    class="mx-auto"
    max-width="368"
  >
    <v-card-item title="Home">
      <template v-slot:subtitle>
        <v-icon
          icon="mdi-alert"
          size="18"
          color="error"
          class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
          {{heatingSystemStats.mean}} &deg;F
        </v-col>

        <v-col cols="6" class="text-right">
          <v-icon
            color="error"
            icon="mdi-weather-hurricane"
            size="88"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-windy"
      >
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        density="compact"
        prepend-icon="mdi-weather-pouring"
      >
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { useHeatingSystemStore } from '../stores/heatingSystemStore';
import IHeatingSystemDictionary from '@/interfaces/iHeatingSystemDictionary';
import { useWeatherStore } from '../stores/weatherStore';
import IWeather from '@/interfaces/iWeather';

@Component({
    components: {
    },
})
export default class Climate extends Vue {
    
  private readonly heatingSystemStore = useHeatingSystemStore();
  private readonly weatherStore = useWeatherStore();
  public get currentHeatingSystems(): IHeatingSystemDictionary {
      return this.heatingSystemStore.getCurrentHeatingSystems;
  }

  get heatingSystemStats():    { mean: number, max: number, min: number, confidenceInterval: [number, number] } {

    const heatingSystems = Object.values(this.currentHeatingSystems);
    const temperatures = heatingSystems.map(system => system.attributes.current_temperature);
    const totalTemperature = temperatures.reduce((a, b) => a + b, 0);
    const meanTemperature = totalTemperature / temperatures.length;
    const maxTemperature = Math.max(...temperatures);
    const minTemperature = Math.min(...temperatures);
    temperatures.sort((a, b) => a - b);
    const lowerQuantile = temperatures[Math.floor((temperatures.length * 0.025))];
    const upperQuantile = temperatures[Math.ceil((temperatures.length * 0.975)) - 1];
    const confidenceInterval : [number, number] = [lowerQuantile, upperQuantile];

    return {
        mean: meanTemperature,
        max: maxTemperature,
        min: minTemperature,
        confidenceInterval: confidenceInterval
    };
}

  public get currentWeather(): IWeather {
      return this.weatherStore.getCurrentWeather;
  }
}
</script>

<style scoped>

</style>
