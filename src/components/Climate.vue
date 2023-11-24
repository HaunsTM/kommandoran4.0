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
          class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="6">
          <v-row align="center" no-gutters>
            <v-col cols="6">Home</v-col>
            <v-col cols="6">{{heatingSystemStats(1).mean}}&nbsp;&deg;C</v-col>
          </v-row>
        </v-col>

        <v-col cols="6" class="text-right">
          <v-icon
            color="error"
            icon="mdi-thermometer"
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
  <v-card
    class="mx-auto"
    max-width="368"
  >
    <v-card-item title="Weather">
      <template v-slot:subtitle>
        <v-icon
          icon="mdi-alert"
          size="18"
          class="me-1 pb-1"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
        <v-table>
          <thead>
            <tr>
              <th class="text-center"><v-icon icon="mdi-gauge"></v-icon></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><v-icon icon="mdi-thermometer-lines"></v-icon></td>
              <td>{{currentWeather.attributes.temperature}}</td>
              <td>{{currentWeather.attributes.temperature_unit}}</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-water-percent"></v-icon></td>
              <td>{{currentWeather.attributes.humidity}}</td>
              <td>%</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-gauge-empty"></v-icon></td>
              <td>{{currentWeather.attributes.pressure}}</td>
              <td>{{currentWeather.attributes.pressure_unit}}</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-weather-windy"></v-icon></td>
              <td>{{roundNumber(currentWeather.attributes.wind_speed, 1)}} ({{roundNumber(currentWeather.attributes.wind_gust_speed, 1)}})</td>
              <td>{{currentWeather.attributes.wind_speed_unit}}</td>
            </tr>
            <tr>
              <td><v-icon icon="mdi-compass"></v-icon></td>
              <td>{{degreesToCompass(currentWeather.attributes.wind_bearing)}}</td>
            </tr>
          </tbody>
        </v-table>
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

  roundNumber(num: number, dec: number) {
    return Number(Math.round(parseFloat(num+'e'+dec))+'e-'+dec);
  }

  // Original function with rounding
  heatingSystemStats(numberOfDecimals: number): { mean: number, max: number, min: number, confidenceInterval: [number, number] } {

      const heatingSystems = Object.values(this.currentHeatingSystems);
      const temperatures = heatingSystems.map(system => system.attributes.current_temperature);
      const totalTemperature = temperatures.reduce((a, b) => a + b, 0);
      const meanTemperature = this.roundNumber(totalTemperature / temperatures.length, numberOfDecimals);
      const maxTemperature = this.roundNumber(Math.max(...temperatures), numberOfDecimals);
      const minTemperature = this.roundNumber(Math.min(...temperatures), numberOfDecimals);
      temperatures.sort((a, b) => a - b);
      const lowerQuantile = this.roundNumber(temperatures[Math.floor((temperatures.length * 0.025))], numberOfDecimals);
      const upperQuantile = this.roundNumber(temperatures[Math.ceil((temperatures.length * 0.975)) - 1], numberOfDecimals);
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

  degreesToCompass(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(((degrees % 360) / 45));
    return directions[index];
  }

}
</script>

<style scoped>

</style>
