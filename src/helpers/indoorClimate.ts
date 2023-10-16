
import IIndoorClimate from '@/interfaces/iIndoorClimate';

export default class IndoorClimate implements IIndoorClimate {
    public entity_id!: string;
    public current_temperature!: number;
    public last_changed!: string;
    public state!: string;
}