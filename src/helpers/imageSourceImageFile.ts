import IImageSourceImageFile from '@/interfaces/iImageSourceImageFile';

export default class ImageSourceImageFile implements IImageSourceImageFile {

    originalFileName: string;

    distributionTimeUTC: number;

    fileSizeInBytes: number;  

    constructor(originalFileName: string, distributionTimeUTC: number, fileSizeInBytes: number) {   

        this.originalFileName = originalFileName;
        this.distributionTimeUTC = distributionTimeUTC;
        this.fileSizeInBytes = fileSizeInBytes;

    }
    
}
