import { ConnectionOptions } from 'paho-mqtt';
export const mqttConfig /*: IClientOptions*/ = {

    "connection": {
      "protocol": "ws",
      "hostname": "10.0.0.6",
      "port": 1884,
      "options": {
        "userName": "mqtt1",
        "password": "mqtt1",
        "cleanSession": true,
        "keepAliveInterval": 100,        
        "reconnect": false,
      } as ConnectionOptions      
    },
    "topic": {
      "calendars": "calendars",
      "climate_heatingSystem_henHouse": "climate/heatingSystem/henHouse",
      "climate_heatingSystem_house": "climate/heatingSystem/house",
      "climate_heatingSystem_house_outdoorRoom": "climate/heatingSystem/house/outdoorRoom",
      "climate_weather": "climate/weather",
      "image_screensaver": "image/screensaver",
      "sensor_henHouse_hatch_lidar_data_distanceCm": "sensor/henHouse/hatch/lidar/data/distanceCm",
      "settings": "settings",
      "transport_departure": "transport/departure"
    }
  }
  
  export default mqttConfig;