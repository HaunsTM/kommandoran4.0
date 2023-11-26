export default interface ISensor {
  attributes: {
    current_temperature: number;
  };
  domain: string;
  last_changed: string;
  last_updated: string;
  state: string;
  timeSinceChangedMs: number;
}