import { Image } from '../image';
import { FileModel } from '../file/file-model';

export interface OtherFileDto {
    readonly fileType: string;
    readonly name: string;
    readonly description: string;
    readonly previewId: number;
    readonly fileId: number;
    readonly availableFree: boolean;
}

export interface OtherFile {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly fileType: string;
    readonly preview: Image;
    readonly file: FileModel;
    readonly availableFree: boolean;
}
