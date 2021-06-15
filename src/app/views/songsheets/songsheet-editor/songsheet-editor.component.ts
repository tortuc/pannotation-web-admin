import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { TagInputModule } from 'ngx-chips';

import { SongsheetsService } from 'src/app/services/songsheets.service';
import { UploadService } from 'src/app/services/uploads.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SongsheetModel } from 'src/app/models/songsheet/songsheet-model';
import { KeyValuePair } from 'src/app/models/response/key-value-pair';
import { map, switchMap } from 'rxjs/operators';
import { KeyValuePairModel } from 'src/app/models/response/key-value-pair-model';
import { TagInputComponent } from 'ngx-chips';
import { ImageModel, Image } from '../../../models/image';
import { TypeModel } from 'src/app/models/songsheet/type-model';

const imagePlaceholder = 'assets/img/image-placeholder.png';
TagInputModule.withDefaults({
    tagInput: {
        placeholder: '',
    }
});

@Component({
    selector: 'app-songsheet-editor',
    templateUrl: './songsheet-editor.component.html',
    styleUrls: ['./songsheet-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SongsheetEditorComponent implements OnInit {
    @ViewChild('tagInput', { static: false }) tagInput: TagInputComponent;
    @ViewChild('chooseTrackInput', { static: false }) chooseTrackInput: ElementRef;
    @ViewChild('deleteTrackButton', { static: false }) deleteTrackButton: ElementRef;

    currentSongsheet = new SongsheetModel();
    self: any;
    songsheetForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('(^(?!\\s+$).+)')]),
        description: new FormControl(null, [Validators.min(0), Validators.max(750), Validators.pattern('(^(?!\\s+$).+)')]),
        artistName: new FormControl(null, [Validators.minLength(0), Validators.maxLength(100), Validators.pattern('(^(?!\\s+$).+)')]),
        producer: new FormControl(null, [Validators.minLength(0), Validators.maxLength(100), Validators.pattern('(^(?!\\s+$).+)')]),
        arranger: new FormControl(null, [Validators.minLength(0), Validators.maxLength(100), Validators.pattern('(^(?!\\s+$).+)')]),
        price: new FormControl(0, [Validators.min(1), Validators.max(100000)]),
        youTubeLink: new FormControl(null),
        isTop: new FormControl(false),
        imageId: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100000)]),
        image: new FormControl(),
        previewId: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100000)]),
        preview: new FormControl(),
        fileId: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100000)]),
        file: new FormControl(),
        trackId: new FormControl(),
        track: new FormControl(),
        genres: new FormControl(null),
        instruments: new FormControl(null),
    });

    image = new BehaviorSubject<ImageModel>(new ImageModel
        ({
            id: 0,
            originalPath: imagePlaceholder,
            compactPath: imagePlaceholder
        }));

    instruments: Array<TypeModel>;
    genres: Array<TypeModel>;
    chosenInstruments: Array<TypeModel>;
    chosenGenres: Array<TypeModel>;

    isSuccessful = new BehaviorSubject<boolean>(false);
    id?: number;
    isEdit: boolean;

    constructor(private activatedRoute: ActivatedRoute,
        private songsheetsService: SongsheetsService,
        private uploadService: UploadService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.initSongsheet();

        this.songsheetsService.getGenres().subscribe(x => {
            this.genres = x;
        });
        this.songsheetsService.getInstruments().subscribe(x => {
            this.instruments = x;
        });
    }

    initSongsheet(): void {
        if (this.activatedRoute.snapshot.data.currentSongsheet) {
            this.currentSongsheet = this.activatedRoute.snapshot.data.currentSongsheet;
            this.songsheetForm.setValue(this.currentSongsheet);
            this.chosenGenres = this.currentSongsheet.genres;
            this.chosenInstruments = this.currentSongsheet.instruments;
            this.image.next(this.currentSongsheet.image);

            // if (this.currentSongsheet.track) {
            //     this.deleteTrackButton.nativeElement.setAttribute('disabled', null);
            // }
        }
        // else
        // {
        //     //init form
        //     this.songsheetForm.get('isTop').setValue(false);
        //     this.songsheetForm.get('imageId').setValue(0);
        //     this.songsheetForm.get('trackId').setValue(0);
        //     this.songsheetForm.get('previewId').setValue(0);
        //     this.songsheetForm.get('fileId').setValue(0);
        //     this.songsheetForm.get('price').setValue(0);
        // }
    }

    onImageChange(event: any): void {
        const target = event.target || event.srcElement;
        const file = target.files[0];
        const body = new FormData();

        body.append('file', file);

        if (file === undefined) {
            this.songsheetForm.get('imageId').setValue(0);
            this.songsheetForm.get('image').setValue(undefined);
            this.image = new BehaviorSubject<ImageModel>(undefined);
            return;
        }

        this.uploadService.uploadImage(body, 'Image').subscribe((data) => {
            this.songsheetForm.get('imageId').setValue(data.id);
            this.image.next(data);
            this.songsheetForm.get('image').setValue(data);
        });
    }

    onFileChange(event: any, type: string): void {
        const target = event.target || event.srcElement;
        const file = target.files[0];
        const body = new FormData();

        body.append('file', file);

        if (file === undefined) {
            switch (type) {
                case 'SongsheetPreview':
                    this.currentSongsheet.preview = undefined;
                    this.songsheetForm.get('previewId').setValue(undefined);
                    this.songsheetForm.get('preview').setValue(undefined);
                    break;
                case 'Songsheet':
                    this.currentSongsheet.file = undefined;
                    this.songsheetForm.get('fileId').setValue(undefined);
                    this.songsheetForm.get('file').setValue(undefined);
                    break;
                case 'AudioTrack':
                    this.currentSongsheet.track = undefined;
                    this.songsheetForm.get('trackId').setValue(undefined);
                    this.songsheetForm.get('track').setValue(undefined);
                    break;
            }
            return;
        }

        if (type === 'AudioTrack') {
            this.deleteTrackButton.nativeElement.removeAttribute('disabled');
        }

        this.uploadService.uploadFile(body, type).subscribe((data) => {
            switch (type) {
                case 'SongsheetPreview':
                    this.currentSongsheet.preview = data;
                    this.songsheetForm.get('previewId').setValue(data.id);
                    break;
                case 'Songsheet':
                    this.currentSongsheet.file = data;
                    this.songsheetForm.get('fileId').setValue(data.id);
                    break;
                case 'AudioTrack':
                    this.currentSongsheet.track = data;
                    this.songsheetForm.get('trackId').setValue(data.id);
                    break;
            }
        },
        (error) => {
            event.target.value = null;
        });
    }

    deleteAudioTrack(e: any) {
        this.currentSongsheet.track = null;
        this.songsheetForm.get('trackId').setValue(undefined);
        this.songsheetForm.get('track').setValue(undefined);
        this.chooseTrackInput.nativeElement.value = null;
        this.deleteTrackButton.nativeElement.setAttribute('disabled', null);
    }

    submit(data: FormGroup): void {
        const body = data.value;
        const genres = [];
        const instruments = [];

        if (body.genres) {
            body.genres.forEach(element => {
                if (element != undefined) {
                    genres.push(element.id);
                }
            });
        }

        if (body.instruments) {
            body.instruments.forEach(element => {
                if (element != undefined) {
                    instruments.push(element.id);
                }
            });
        }

        body.genres = genres;
        body.instruments = instruments;

        Object.keys(body).forEach((k) => {
            if ((typeof body[k] === 'string' && body[k] === '') || (body[k] instanceof Array && body[k].length === 0)) {
                body[k] = null;
            }
        });

        if (body.id == null) {
            this.songsheetsService.create(body)
                .subscribe(() => this.router.navigate(['/music-scores']));
        } else {
            this.songsheetsService.update(body)
                .subscribe(() => this.router.navigate(['/music-scores']));
        }
    }

    validateControl(control: AbstractControl, name: string): string {
        const errorsArr = {
            name: {
                required: 'Name is required',
                minLength: 'Name must be from 3 to 50 symbols',
                maxLength: 'Name must be from 3 to 50 symbols',
                pattern: 'Name cannot contain spaces only'
            },
            description: {
                minLength: 'Description must be from 1 to 50 symbols',
                maxLength: 'Description must be from 1 to 50 symbols',
                pattern: 'Description cannot contain spaces only'
            },
            artistName: {
                minLength: 'Artist Name must be from 1 to 100 symbols',
                maxLength: 'Artist Name must be from 1 to 100 symbols',
                pattern: 'Artist Name cannot contain spaces only'
            },
            producer: {
                minLength: 'Composer must be from 1 to 100 symbols',
                maxLength: 'Composer must be from 1 to 100 symbols',
                pattern: 'Composer cannot contain spaces only'
            },
            arranger: {
                minLength: 'Arranger must be from 1 to 100 symbols',
                maxLength: 'Arranger must be from 1 to 100 symbols',
                pattern: 'Arranger cannot contain spaces only'
            },
            price: {
                required: 'Price is required',
                min: 'Price must be from 1 to 100000',
                max: 'Price must be from 1 to 100000',
            },
            youTubeLink: {
                required: 'YouTube link is invalid'
            },
            imageId: {
                required: 'Image is required',
                min: 'Image id is invalid',
                max: 'Image id is invalid'
            },
            previewId: {
                required: 'Songsheet preview is required',
                min: 'Sheet preview id is invalid',
                max: 'Sheet preview id is invalid'
            },
            fileId: {
                required: 'Songsheet is required',
                min: 'File id is invalid',
                max: 'File id is invalid',
            },
            genres: { },
            instruments: { },
        };

        let error = '';
        if (!control.valid) {

            Object.keys(control.errors).forEach((k) => {
                error = errorsArr[name][k];
            });
        }
        return error;
    }
}
