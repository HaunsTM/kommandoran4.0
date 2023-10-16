import {ITransportData} from '@/interfaces/iTransportData';
import Departure from '@/helpers/departure';
import TransportData from '@/helpers/transportData';
import _ from "lodash";
import IAllTransportData from '@/interfaces/iAllTransportData';
import IDeparture from '@/interfaces/iDeparture';
export default class AllTransportData implements IAllTransportData {
    private _lines: Array<ITransportData>;
    public Departures!: IDeparture[];

    constructor(lines: Array<ITransportData>) {
        this._lines = lines;
        this.parse();
    }

    private parse(): void {
        const parsedAndFiltered = _(this._lines)
            .map((l) => {
                return new TransportData(l)
            })
            .orderBy(['journeyDateTime'],['asc'])
            .groupBy(l => l.city)
            .map( (value, prop) => {
                const city = prop;
                const lines = value;
                const departure = new Departure(city, lines);
               return departure;
            })
            .value();
        this.Departures = parsedAndFiltered;
    }
}
