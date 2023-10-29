
import IImageReceivedImage from '@/interfaces/iImageReceivedImage';

export default class ImageReceivedImage implements IImageReceivedImage {

    private _base64Image = "";

    constructor(base64Image: string) {   

        this._base64Image = base64Image;        

    }
    
    get src(): string {
        
        return this._base64Image;
    }

    get sizeInBytes(): number {
        const match = this._base64Image.match(/^data:image[/][^;]+;base64,/);

        const length = match ? this._base64Image.length - match[0].length : this._base64Image.length;

        // Each base64 character encodes 6 bits of data
        const dataSize = length * 6;

        // Convert from bits to bytes
        const sizeInBytes = dataSize / 8;

        return sizeInBytes;
    }

    get sizeInKBytes(): number {
        const sizeInBytes = this.sizeInBytes;
        
        // Convert from bytes to kilobytes
        const sizeInKilobytes = sizeInBytes / 1024;
        return sizeInKilobytes;
    }

}
