import {ITransportData} from '@/interfaces/iTransportData';
export default class TransportData implements ITransportData {
    city!: string;
    journeyDateTime!: number;
    journeyDate!: string;
    journeyTime!: string;
    lineTypeName!: string;
    name!: string;
    towards!: string;    
    realTimeInfo!: {
        newDepPoint: string;
        depTimeDeviation: string;
        depDeviationAffect: string;
    }
    runNo!: string;

    constructor(line: ITransportData) {
        this.parse(line);
    }

    private parse(line: ITransportData): void {
        if (line) {

            const cityMatches = line?.towards?.match(/^([^\s])+/);
            this.city = cityMatches ? cityMatches[0] : '';

            this.name = line.name ? line.name : '';

            this.journeyDateTime = line.journeyDateTime ? 
                new Date(line.journeyDateTime).getTime() : -1;

            this.journeyDate = line.journeyDateTime ? 
                new Date(line.journeyDateTime)
                    .toLocaleDateString('sv-SE') : '';

            this.journeyTime = line.journeyDateTime ? 
                new Date(line.journeyDateTime)
                    .toLocaleTimeString('sv-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }) : '';

            this.lineTypeName = line.lineTypeName ? line.lineTypeName : '';

            this.towards = line.towards ?  line.towards : '';

            this.realTimeInfo = {
                newDepPoint : line.realTimeInfo?.newDepPoint ? line.realTimeInfo?.newDepPoint : '',
                depTimeDeviation : line.realTimeInfo?.depTimeDeviation ? line.realTimeInfo?.depTimeDeviation : '',
                depDeviationAffect : line.realTimeInfo?.depDeviationAffect ? line.realTimeInfo?.depDeviationAffect : '',
            };
            runNo: this.runNo ? this.runNo : '';
        }
    }
}