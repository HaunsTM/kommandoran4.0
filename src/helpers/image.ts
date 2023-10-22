import IImage from '@/interfaces/iImage';

export default class Image implements IImage {

    readonly actualHostSrcImage!: string;
    readonly distributionTimeUTC!: number;
    readonly originalFileName!: string;

    constructor(actualHostSrcImage: string, originalFileName: string, distributionTimeUTC: number) {        
        this.actualHostSrcImage = actualHostSrcImage;
        this.originalFileName = originalFileName;
        this.distributionTimeUTC = distributionTimeUTC;
    }

    private srcUrlUnique(): string {
        const url = 
            `${this.actualHostSrcImage}?${this.distributionTimeUTC}`;
        return url;
    }

    async src(): Promise<string> {
        const url = this.srcUrlUnique();
        const base64Image = await this.getBase64Image(url);
        const src = base64Image;
        return src;
    }

    private async getBase64Image(url: string): Promise<string> {
        const response = await fetch(url);
        const blob = await response.blob();
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                } else {
                    reject('Unexpected result type');
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
}
