import ImageSourceImageFile from './imageSourceImageFile';
import ImageReceivedImage from './imageReceivedImage';
import IImage from '@/interfaces/iImage';

export default class Image implements IImage {

    private _actualHostSrcImage: string;

    private _sourceImageFile: ImageSourceImageFile;

    private _base64Image = "";

    constructor(actualHostSrcImage: string, originalFileName: string, distributionTimeUTC: number, fileSizeInBytes: number) {        
        this._actualHostSrcImage = actualHostSrcImage;
        this._sourceImageFile = new ImageSourceImageFile(originalFileName, distributionTimeUTC, fileSizeInBytes);
    }

    private srcUrlUnique(): string {
        const url = 
            `${this._actualHostSrcImage}?${this._sourceImageFile.distributionTimeUTC}`;
        return url;
    }

    private async getBase64Image(url: string): Promise<string> {
        try {
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
        } catch (error) {
            return "";
        }
    }

    get actualHostSrcImage() {
        return this._actualHostSrcImage;
    }

    sourceImageFile() {
        return this._sourceImageFile;
    }
    
    
    async receivedImage() {
        
        if (this._base64Image === "") {
            const url = this.srcUrlUnique();
            this._base64Image = await this.getBase64Image(url);
        }

        return new ImageReceivedImage(this._base64Image);

    }
}
