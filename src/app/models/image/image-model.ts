import { Image } from './image';
import { SafeUrl } from '@angular/platform-browser';

export class ImageModel implements Image {
    readonly id: number;
    readonly originalPath: string;
    readonly compactPath: string;
    
    constructor (image: Image) {
        this.id = image.id;
        this.originalPath = image.originalPath;
        this.compactPath = image.compactPath;
    }
}
