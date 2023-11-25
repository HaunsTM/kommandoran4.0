export default interface IClimateWeather {
  entity_id: string;
  state: string;
  attributes: {
    temperature: number;
    dew_point: number;
    temperature_unit: string;
    humidity: number;
    cloud_coverage: number;
    pressure: number;
    pressure_unit: string;
    wind_bearing: number;
    wind_gust_speed: number;
    wind_speed: number;
    wind_speed_unit: string;
    visibility_unit: string;
    precipitation_unit: string;
    forecast: {
      condition: string;
      precipitation_probability: number;
      datetime: string;
      wind_bearing: number;
      temperature: number;
      templow: number;
      wind_gust_speed: number;
      wind_speed: number;
      precipitation: number;
      humidity: number;
    }[];
    attribution: string;
    friendly_name: string;
    supported_features: number;
  };
  context: {
    id: string;
    parent_id: null;
    user_id: null;
  };
  last_changed: string;
  last_updated: string;
  timeSinceChangedMs: number;
}
