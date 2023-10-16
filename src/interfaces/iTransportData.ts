export interface ITransportData {
    city: string;
    name: string;
    journeyDate: string;
    journeyDateTime: number;
    journeyTime: string;
    lineTypeName: string;
    realTimeInfo: {
        newDepPoint: string;
        depTimeDeviation: string;
        depDeviationAffect: string;
    }
    runNo: string;
    towards: string;
}
