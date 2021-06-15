import { ImageModel } from '../image';
import { FileModel } from '../file/file-model';
import { OtherFile } from './other-file';

export class OtherFileModel {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly fileType: string;
    readonly availableFree: boolean;
    readonly preview: ImageModel;
    readonly file: FileModel;

    constructor(data: OtherFile) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.fileType = data.fileType;
        this.availableFree = data.availableFree;
        this.preview = new ImageModel(data.preview);
        this.file = new FileModel(data.file);
    }
}
