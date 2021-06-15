import { File } from './file';

export class FileModel implements File {
    readonly id: number;
    readonly path: string;
    readonly type: string;

    constructor (file: File) {
        this.id = file.id;
        this.path = file.path;
        this.type = file.type;
    }
}
