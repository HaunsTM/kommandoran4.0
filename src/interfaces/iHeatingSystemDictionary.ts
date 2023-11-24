export default interface IHeatingSystemDictionary {    
  [entity_id: string]: {
    attributes: {
      current_temperature: number;
    };
    last_changed: string;
    last_updated: string;
    state: string;
    timeSinceChangedMs: number;
  };
}