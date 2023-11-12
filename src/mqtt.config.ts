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
      "climate_utilityRoomFloor": "climate/grovkök_golv",
      "climate_mainThermostat": "climate/huvudtermostat",
      "climate_outdoorRoom": "climate/uterum",
      "climate_sjöstorpsvägen_3a": "climate/sjöstorpsvägen_3a",
      "image_screensaver": "image/screensaver",
      "sound_play_file": "sound/play/file",
      "transport_departure": "transport/departure",
      "calendars": "calendars"
    }
  }
  
  export default mqttConfig;