import IImageSourceImageFile from '@/interfaces/iImageSourceImageFile';
import IImageReceivedImage from '@/interfaces/iImageReceivedImage';
export default interface IImage {

    get actualHostSrcImage(): string;

    sourceImageFile() : IImageSourceImageFile;
    
    receivedImage() : Promise<IImageReceivedImage>;  
}