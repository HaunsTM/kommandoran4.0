<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12">
        <v-card fluid class="ma-0 pa-0">
          <v-card-item title="Climate">
          </v-card-item>

          <v-card-text class="ma-1 pa-0">
            <v-row>
              <v-col cols="6">
                <!-- House Table -->
                <table>
                  <thead>
                    <tr>
                      <th colspan="2" class="border-bottom">House</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Indoor</td><td>{{currentClimateHeatingSystemsHouse(1).mean}}&nbsp;&deg;C</td>
                    </tr>
                    <tr>
                      <td>Outdoor&nbsp;room</td><td>{{currentClimateHeatingSystemOutdoorRoom(1).mean}}&nbsp;&deg;C</td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
              <v-col cols="6">
                <!-- Hen House Table -->
                <table>
                  <thead>
                    <tr>
                      <th colspan="4" class="border-bottom border-left">Hen house</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="2" class="border-left">Barn</td><td colspan="2">{{currentClimateHeatingSystemHenHouse(1).mean}}&nbsp;&deg;C</td>
                    </tr>
                    <tr>
                      <td class="border-left"><v-icon :color="henHouseHeatLampState.mdiColor">{{ henHouseHeatLampState.mdiIcon }}</v-icon></td><td>{{ henHouseHeatLampState.state }}</td><td class="border-left"><v-icon>{{ henHouseHatchOpeningLevelSymbol.mdiIcon }}</v-icon></td><td>{{ henHouseHatchOpeningLevelSymbol.openingLevelText }}</td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-divider></v-divider>
                <table>
                  <thead>
                    <tr>
                      <th colspan="4" class="border-bottom">Outdoor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><v-icon icon="mdi-thermometer-lines"></v-icon></td>
                      <td>{{currentClimateWeather.attributes?.temperature}}&nbsp;{{currentClimateWeather.attributes?.temperature_unit}}</td>
                      <td class="border-left"><v-icon icon="mdi-water-percent"></v-icon></td>
                      <td>{{currentClimateWeather.attributes?.humidity}}&nbsp;%</td>
                      <td class="border-left"><v-icon icon="mdi-gauge-empty"></v-icon></td>
                      <td>{{currentClimateWeather.attributes?.pressure}}&nbsp;{{currentClimateWeather.attributes?.pressure_unit}}</td>
                    </tr>
                    <tr>
                      <td><v-icon icon="mdi-weather-windy"></v-icon></td>
                      <td>{{roundNumber(currentClimateWeather.attributes?.wind_speed, 1)}}&nbsp;({{roundNumber(currentClimateWeather.attributes?.wind_gust_speed, 1)}}) {{currentClimateWeather.attributes?.wind_speed_unit}}</td>
    
                      <td class="border-left"><v-icon icon="mdi-compass"></v-icon></td>
                      <td colspan="3">{{degreesToCompass(currentClimateWeather.attributes?.wind_bearing)}}&nbsp;({{currentClimateWeather.attributes?.wind_bearing}}&deg;)</td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
            
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    let mdiColor = "";
    let state = heatLamp.state;

    if (heatLamp.state === "on") {
      mdiIcon = "mdi-printer-3d-nozzle-heat";
      mdiColor = "error";
    } 
    
    if (heatLamp.state === "on") {
      mdiIcon = "mdi-printer-3d-nozzle-heat-outline";
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
  .border-bottom {
      border-bottom: 1px solid #343434;
  }
  .border-left {
    border-left: 1px solid #343434;
    padding-left: 0.5rem;
  }
  td {
    padding: 0 0.4rem;
  }
</style>