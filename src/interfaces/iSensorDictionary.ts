import ISensor from '@/interfaces/iSensor';

export default interface ISensorDictionary {    
  [entity_id: string]: ISensor;
}