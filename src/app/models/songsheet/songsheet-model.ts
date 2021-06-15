import { Songsheet } from './songsheet';
import { Image, ImageModel } from '../image';
import { UserModel } from '../user/user-model';
import { SafeUrl } from '@angular/platform-browser';
import { KeyValue } from '@angular/common';
import { FileModel } from '../file/file-model';
import { TypeModel } from './type-model';

export class SongsheetModel implements Songsheet {
    readonly id: number;
    readonly name: string;
    readonly description?: string;
    readonly artistName?: string;
    readonly producer: string;
    readonly arranger: string;
    readonly price: number;
    readonly youTubeLink?: string;
    readonly isTop: boolean;
    preview: FileModel;
    previewId: number;
    image: Image;
    imageId: number;
    file: FileModel;
    fileId: number;
    track?: FileModel;
    trackId: number;
    readonly instruments: Array<TypeModel>;
    readonly genres: Array<TypeModel>;

    constructor(songsheet?: Songsheet) {
        this.id = songsheet != null ? songsheet.id : 0;
        this.name = songsheet != null ? songsheet.name : '';
        this.description = songsheet != null ? songsheet.description : '';
        this.artistName = songsheet != null ? songsheet.artistName : '';
        this.producer = songsheet != null ? songsheet.producer : '';
        this.arranger = songsheet != null ? songsheet.arranger : '';
        this.price = songsheet != null ? songsheet.price : 0;
        this.youTubeLink = songsheet != null ? songsheet.youTubeLink : '';
        this.isTop = songsheet != null ? songsheet.isTop : false;
        this.preview = songsheet != null ? songsheet.preview : null;
        this.previewId = songsheet != null ? (songsheet.preview != null ? songsheet.preview.id : null) : null;
        this.image = songsheet != null ? songsheet.image : null;
        this.imageId = songsheet != null ? (songsheet.image != null ? songsheet.image.id : null) : null;
        this.file = songsheet != null ? songsheet.file : null;
        this.fileId = songsheet != null ? (songsheet.file != null ? songsheet.file.id : null) : null;
        this.track = songsheet != null ? songsheet.track : null;
        this.trackId = songsheet != null ? (songsheet.track != null ? songsheet.track.id : null) : null;
        this.genres = [];
        this.instruments = [];
        if (songsheet != null) {
            Object.keys(songsheet.genres).forEach((key) => this.genres.push({ id: parseInt(key, 10), name: songsheet.genres[key] }));
            Object.keys(songsheet.instruments).forEach((key) => this.instruments.push({ id: parseInt(key, 10), name: songsheet.instruments[key] }));
        }
    }
}
