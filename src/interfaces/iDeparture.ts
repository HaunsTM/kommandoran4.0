import {ITransportData} from '@/interfaces/iTransportData';
export default interface IDeparture {  
    city: string;
    lines: ITransportData[]
}
