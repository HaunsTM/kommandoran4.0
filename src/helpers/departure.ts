import IDeparture from '@/interfaces/iDeparture';
import {ITransportData} from '@/interfaces/iTransportData';

export default class Departure implements IDeparture {
    city!: string;
    lines!: ITransportData[];

    constructor(city: string, lines: ITransportData[]) {
        this.city = city;
        this.lines = lines;
    }
}
