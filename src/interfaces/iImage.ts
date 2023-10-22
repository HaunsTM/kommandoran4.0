export default interface IImage {
    actualHostSrcImage: string;
    distributionTimeUTC: number;
    originalFileName: string;
    
    src(): Promise<string>;
}