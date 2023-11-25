export default interface IHeatingSystem {
  attributes: {
    current_temperature: number;
  };
  last_changed: string;
  last_updated: string;
  state: string;
  timeSinceChangedMs: number;
}