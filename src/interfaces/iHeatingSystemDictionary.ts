import IHeatingSystem from '@/interfaces/iHeatingSystem';

export default interface IHeatingSystemDictionary {    
  [entity_id: string]: IHeatingSystem;
}