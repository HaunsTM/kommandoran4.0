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
      "heatingSystem": "heatingSystem",
      "image_screensaver": "image/screensaver",
      "transport_departure": "transport/departure",
      "weather": "weather"
    }
  }
  
  export default mqttConfig;