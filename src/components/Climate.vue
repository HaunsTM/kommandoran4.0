<template> 





  <v-container fill-height fluid>
    <v-row align="start" justify="center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Home
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>Summary</th>
                <th>&deg;C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Indoor</td><td>{{currentClimateHeatingSystemsHouse(1).mean}}</td>
              </tr>
              <tr>
                <td>Outdoor room</td><td>{{currentClimateHeatingSystemOutdoorRoom(1).mean}}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>
    
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Hen house
          </v-card-title>          
          <v-table>
            <thead>
              <tr>
                <th>Summary</th>
                <th>&deg;C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Barn</td><td>{{currentClimateHeatingSystemHenHouse(1).mean}}</td>
              </tr>
            </tbody>
          </v-table>
          <div class="d-flex py-3 justify-space-between">
            <v-list-item
              :prepend-icon="henHouseHeatLampState.mdiIcon"
              :color="henHouseHeatLampState.mdiColor"
            >
              <v-list-item-subtitle>{{ henHouseHeatLampState.state }}</v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              :prepend-icon ="henHouseHatchOpeningLevelSymbol.mdiIcon"
            >
              <v-list-item-subtitle>{{ henHouseHatchOpeningLevelSymbol.openingLevelText }}</v-list-item-subtitle>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-card>
    <v-card-item title="Weather">
    </v-card-item>

    <v-card-text>
            
      <Vue3Marquee :clone="true" :duration="5">
        
        <v-card>
          <v-card-title>
            Temperature
          </v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-thermometer-lines"></v-icon>{{currentClimateWeather.attributes?.temperature}}&nbsp;{{currentClimateWeather.attributes?.temperature_unit}}
          </v-card-subtitle>
        </v-card>
        <v-card>
          <v-card-title>
            Humidity
          </v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-water-percent"></v-icon>&nbsp;{{currentClimateWeather.attributes?.humidity}}&nbsp;%
          </v-card-subtitle>
        </v-card>
        <v-card>
          <v-card-title>
            Air pressure
          </v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-gauge-empty"></v-icon>&nbsp;{{currentClimateWeather.attributes?.pressure}}&nbsp;{{currentClimateWeather.attributes?.pressure_unit}}
          </v-card-subtitle>
        </v-card>
        <v-card>
          <v-card-title>
            Wind speed
          </v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-weather-windy"></v-icon>&nbsp;{{roundNumber(currentClimateWeather.attributes?.wind_speed, 1)}}&nbsp;({{roundNumber(currentClimateWeather.attributes?.wind_gust_speed, 1)}})&nbsp;{{currentClimateWeather.attributes?.wind_speed_unit}}
          </v-card-subtitle>
        </v-card>
        <v-card>
          <v-card-title>
            Wind bearing
          </v-card-title>
          <v-card-subtitle>
            <v-icon icon="mdi-compass"></v-icon>&nbsp;{{degreesToCompass(currentClimateWeather.attributes?.wind_bearing)}}&nbsp;({{currentClimateWeather.attributes?.wind_bearing}}&deg;)
          </v-card-subtitle>
        </v-card>

      </Vue3Marquee>
      
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { useClimateHeatingSystemStore } from '../stores/climateHeatingSystemStore';
import IHeatingSystemDictionary from '@/interfaces/iHeatingSystemDictionary';
import { useClimateWeatherStore } from '../stores/climateWeatherStore';
import IClimateWeather from '@/interfaces/IClimateWeather';
import { useSensorStore } from '../stores/sensorStore';
import { useSettingStore } from '../stores/settingStore';

import { Vue3Marquee } from 'vue3-marquee'
import ISensor from '@/interfaces/iSensor';
@Component({
    components: {
      Vue3Marquee
    },
})
export default class Climate extends Vue {
    
  private readonly climateHeatingSystemStore = useClimateHeatingSystemStore();
  private readonly climateWeatherStore = useClimateWeatherStore();
  private readonly sensorStore = useSensorStore();
  private readonly settingStore = useSettingStore();

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

  get henHouseHatchOpeningLevel(): number {
    const currentDistanceCm = this.sensorStore.getCurrentHenHouseHatchLidarDataDistanceCm;
    const distBetweenLIDARAndOpenHatchEdgeCm = parseFloat(this.settingStore.getCurrent?.henHouse?.hatch?.distance?.distBetweenLIDARAndOpenHatchEdgeCm);
    const distBetweenLIDARAndClosedHatchEdgeCm = parseFloat(this.settingStore.getCurrent?.henHouse?.hatch?.distance?.distBetweenLIDARAndClosedHatchEdgeCm);
    // corrections due to possible incorrect LIDAR measurement, ensure dMin ≤ dCurrent ≤ dMax
    let correctedCurrentDistanceCm = currentDistanceCm;

    //if measurement is under minimum level
    if (currentDistanceCm < distBetweenLIDARAndOpenHatchEdgeCm ) {
        correctedCurrentDistanceCm = distBetweenLIDARAndOpenHatchEdgeCm;
    }

    //if measurement extends maximum level
    if (currentDistanceCm > distBetweenLIDARAndClosedHatchEdgeCm ) {
        correctedCurrentDistanceCm = distBetweenLIDARAndClosedHatchEdgeCm;
    }

    // "normalized"
    const dMin = distBetweenLIDARAndOpenHatchEdgeCm - distBetweenLIDARAndOpenHatchEdgeCm;
    const dMax = distBetweenLIDARAndClosedHatchEdgeCm - distBetweenLIDARAndOpenHatchEdgeCm;

    const dCurrent = correctedCurrentDistanceCm - distBetweenLIDARAndOpenHatchEdgeCm;

    // calculate opening levels
    let hatchCloseLevel = dCurrent / dMax * 100;
    let hatchOpeningLevel = 100 - hatchCloseLevel;

    hatchOpeningLevel = Math.round(hatchOpeningLevel);

    return hatchOpeningLevel;
  }

  get henHouseHatchOpeningLevelSymbol():{mdiIcon: string, openingLevelText: string} {
    const isConsideredClosed = this.settingStore.getCurrent?.henHouse?.hatch?.distance?.isConsideredClosed;
    const isConsideredNotClosed = this.settingStore.getCurrent?.henHouse?.hatch?.distance?.isConsideredNotClosed;
    const isConsideredOpen = this.settingStore.getCurrent?.henHouse?.hatch.distance?.isConsideredOpen;

    const henHouseHatchOpeningLevel = this.henHouseHatchOpeningLevel;
    let mdiIcon = "";
    let openingLevelText = "NO_LEVEL";
    switch (true) {
      case (henHouseHatchOpeningLevel < parseFloat(isConsideredClosed?.toOpeningPercentLevel)): {
        mdiIcon = "mdi-garage-variant";
        openingLevelText = isConsideredClosed["stateName"];
        break;
      }
      case (parseFloat(isConsideredNotClosed?.fromOpeningPercentLevel) <= henHouseHatchOpeningLevel && henHouseHatchOpeningLevel < parseFloat(isConsideredNotClosed?.toOpeningPercentLevel)): {
        mdiIcon = "mdi-garage-alert-variant";
        openingLevelText = isConsideredNotClosed.stateName;
        break;
      }
      case (parseFloat(isConsideredOpen?.fromOpeningPercentLevel) <= henHouseHatchOpeningLevel): {
        mdiIcon = "mdi-garage-open-variant";
        openingLevelText = isConsideredOpen["stateName"];
        break;
      }
    }

    return {
      mdiIcon: mdiIcon, 
      openingLevelText: openingLevelText
    }
    
  }

  get henHouseHeatLampState():{mdiIcon: string, mdiColor: string, state: string} {
    const heatLamp = JSON.parse(JSON.stringify(this.sensorStore.getCurrentHenHouseHeatLamp)) as ISensor;

    let mdiIcon = "mdi-printer-3d-nozzle-heat-outline";
    let mdiColor = "info";
    let state = heatLamp.state;

    if (heatLamp.state === "on") {
      mdiIcon = "mdi-printer-3d-nozzle-heat";
      mdiColor = "error";
    } 
    
    return {
      mdiIcon : mdiIcon,
      mdiColor : mdiColor,
      state : state
    };
  
  }

}
</script>

<style scoped>
</style>