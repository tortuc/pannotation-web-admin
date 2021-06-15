import { Image } from '../image';
import { FileModel } from '../file/file-model';
import { TypeModel } from './type-model';

export interface Songsheet {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly artistName?: string;
    readonly producer: string;
    readonly arranger: string;
    readonly price: number;
    readonly youTubeLink?: string;
    readonly isTop: boolean;
    readonly preview?: FileModel;
    readonly image?: Image;
    readonly file: FileModel;
    readonly track?: FileModel;
    readonly instruments: Array<TypeModel>;
    readonly genres: Array<TypeModel>;
}
