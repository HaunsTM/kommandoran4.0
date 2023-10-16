import IOutdoorClimate from '@/interfaces/iOutdoorClimate';

export default class OutdoorClimate implements IOutdoorClimate {
    entity_id!: string;
    current_temperature!: number;

    humidity!: number;
    pressure!: number;
    wind_bearing!: number;
    wind_speed!: number;

    last_changed!: string;
    state!: string;

}