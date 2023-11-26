<template> 

  <v-container  fill-height fluid>
    <v-row align="start" justify="center">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-card-item title="Home">
          </v-card-item>

          <v-card-text class="py-0">
            <v-row align="center" no-gutters>
              <v-col cols="6">Home</v-col>
              <v-col cols="6">{{currentClimateHeatingSystemsHouse(1).mean}}&nbsp;&deg;C</v-col>
            </v-row>
            
            <v-row align="center" no-gutters>
              <v-col cols="6">Outdoor room</v-col>
              <v-col cols="6">{{currentClimateHeatingSystemOutdoorRoom(1).mean}}&nbsp;&deg;C</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    
      <v-col cols="12">
        <v-card
          class="mx-auto"
        >
          <v-card-item title="Hen house">
          </v-card-item>

          <v-card-text class="py-0">
            
            <v-row align="center" no-gutters>
              <v-col cols="6">Hen house</v-col>
              <v-col cols="6">{{currentClimateHeatingSystemHenHouse(1).mean}}&nbsp;&deg;C</v-col>
            </v-row>
          </v-card-text>

          <div class="d-flex py-3 justify-space-between">
            <v-list-item
              density="compact"
              prepend-icon="mdi-heat-wave"
            >
              <v-list-item-subtitle>on</v-list-item-subtitle>
            </v-list-item>

            <v-list-item
              density="compact"
              prepend-icon="mdi-garage-open-variant"
            >
              <v-list-item-subtitle>48%</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              density="compact"
              prepend-icon="mdi-garage-alert-variant"
            >
              <v-list-item-subtitle>48%</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              density="compact"
              prepend-icon="mdi-garage-variant"
            >
              <v-list-item-subtitle>48%</v-list-item-subtitle>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-card>
    <v-card-item title="Weather">
    </v-card-item>

    <v-card-text class="py-0">

      <v-list class="v-list-scroll">
        <v-list-item class="v-list-item-scroll" style="animation-delay: 0s;">
          <v-list-item-content>
            <v-list-item-title>Temperature</v-list-item-title>
            <v-list-item-subtitle><v-icon icon="mdi-thermometer-lines"></v-icon>&nbsp;{{currentClimateWeather.attributes?.temperature}}&nbsp;{{currentClimateWeather.attributes?.temperature_unit}}</v-list-item-subtitle>
          </v-list-item-content>            
        </v-list-item>
        <v-list-item class="v-list-item-scroll" style="animation-delay: 1s;">
          <v-list-item-content>
            <v-list-item-title>Humidity</v-list-item-title>
            <v-list-item-subtitle><v-icon icon="mdi-water-percent"></v-icon>&nbsp;{{currentClimateWeather.attributes?.humidity}}&nbsp;%</v-list-item-subtitle>
          </v-list-item-content>            
        </v-list-item>
        <v-list-item class="v-list-item-scroll" style="animation-delay: 2s;">
          <v-list-item-content>
            <v-list-item-title>Air pressure</v-list-item-title>
            <v-list-item-subtitle><v-icon icon="mdi-gauge-empty"></v-icon>&nbsp;{{currentClimateWeather.attributes?.pressure}}&nbsp;{{currentClimateWeather.attributes?.pressure_unit}}</v-list-item-subtitle>
          </v-list-item-content>            
        </v-list-item>
        <v-list-item class="v-list-item-scroll" style="animation-delay: 3s;">
          <v-list-item-content>
            <v-list-item-title>Wind speed</v-list-item-title>
            <v-list-item-subtitle><v-icon icon="mdi-weather-windy"></v-icon>&nbsp;{{roundNumber(currentClimateWeather.attributes?.wind_speed, 1)}}&nbsp;({{roundNumber(currentClimateWeather.attributes?.wind_gust_speed, 1)}})&nbsp;{{currentClimateWeather.attributes?.wind_speed_unit}}</v-list-item-subtitle>
          </v-list-item-content>            
        </v-list-item>
        <v-list-item class="v-list-item-scroll" style="animation-delay: 4s;">
          <v-list-item-content>
            <v-list-item-title>Wind bearing</v-list-item-title>
            <v-list-item-subtitle><v-icon icon="mdi-compass"></v-icon>&nbsp;{{degreesToCompass(currentClimateWeather.attributes?.wind_bearing)}}&nbsp;({{currentClimateWeather.attributes?.wind_bearing}}&deg;)</v-list-item-subtitle>
          </v-list-item-content>            
        </v-list-item>
        
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { useClimateHeatingSystemStore } from '../stores/climateHeatingSystemStore';
import IHeatingSystemDictionary from '@/interfaces/iHeatingSystemDictionary';
import { useClimateWeatherStore } from '../stores/climateWeatherStore';
import IClimateWeather from '@/interfaces/IClimateWeather';

@Component({
    components: {
    },
})
export default class Climate extends Vue {
    
  private readonly climateHeatingSystemStore = useClimateHeatingSystemStore();
  private readonly climateWeatherStore = useClimateWeatherStore();

  public currentClimateHeatingSystemHenHouse(numberOfDecimals: number): { mean: number, max: number, min: number, confidenceInterval: [number, number] } {
    const heatingSystemStats = this.heatingSystemStats(this.climateHeatingSystemStore.getCurrentHenHouse, numberOfDecimals);
    return heatingSystemStats;
  }

  public currentClimateHeatingSystemsHouse(numberOfDecimals: number): { mean: number, max: number, min: number, confidenceInterval: [number, number] } {
    const heatingSystemStats = this.heatingSystemStats(this.climateHeatingSystemStore.getCurrentHouse, numberOfDecimals);
    return heatingSystemStats;
  }
  
  public currentClimateHeatingSystemOutdoorRoom(numberOfDecimals: number): { mean: number, max: number, min: number, confidenceInterval: [number, number] } {
    const heatingSystemStats = this.heatingSystemStats( this.climateHeatingSystemStore.getCurrentOutdoorRoom, numberOfDecimals);
    return heatingSystemStats;
  }

  roundNumber(num: number, dec: number) {
    return Number(Math.round(parseFloat(num+'e'+dec))+'e-'+dec);
  }

  // Original function with rounding
  heatingSystemStats(heatingSystemsProxy : IHeatingSystemDictionary, numberOfDecimals: number): { mean: number, max: number, min: number, confidenceInterval: [number, number] } {

    const heatingSystems = Object.values(heatingSystemsProxy);
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

  public get currentClimateWeather(): IClimateWeather {
    return this.climateWeatherStore.getCurrentClimateWeather;
  }

  degreesToCompass(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(((degrees % 360) / 45));
    return directions[index];
  }

}
</script>

<style scoped>
.v-list-scroll {
  width: 100%; /* Adjust based on your needs */
  display: flex; /* Add this */
  overflow: hidden;
}

.v-list-item-scroll {
  width: 30%; /* Add this */
  animation: scroll-left 5s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>