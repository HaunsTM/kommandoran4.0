import ITransportData from '@/interfaces/iTransportData';
export default class TransportData implements ITransportData {
    city!: string;
    name!: string;
    line!: string;
    journeyDate!: string;
    journeyDateTime!: number;
    journeyTime!: string;
    direction!: string;

    constructor(line: ITransportData) {
        this.parse(line);
    }

    private parse(line: ITransportData): void {
        if (line) {

            const cityMatches = line?.direction?.match(/^([^\s])+/);
            this.city = cityMatches ? cityMatches[0] : '';

            this.name = line.name ? line.name : '';
            this.line = line.line ? line.line : '';

            this.journeyDateTime = line.journeyDateTime ? 
                new Date(line.journeyDateTime).getTime() : -1;

            this.journeyDate = line.journeyDateTime ? 
                new Date(line.journeyDateTime)
                    .toLocaleDateString('sv-SE') : '';

            this.journeyTime = line.journeyDateTime ? 
                new Date(line.journeyDateTime)
                    .toLocaleTimeString('sv-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }) : '';

            this.direction = line.direction ?  line.direction : '';
        }
    }
}