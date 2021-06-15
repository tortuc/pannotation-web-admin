import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ImageModel } from '../../../../models/image';
import { UploadService } from '../../../../services/uploads.service';
import { OtherFilesDropdownItem } from '../../other-files.interface';
import { OtherFilesTypes } from '../../../../core/enums/other-files-types';
import { createFilesNames, formErrorsMap } from './create.config';
import { OtherFileDto } from '../../../../models/other-files/other-file';
import { OtherFilesService } from '../../../../services/other-files.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherFileModel } from '../../../../models/other-files/other-file-model';
import { OtherFilesPages } from '../other-files-views.enum';

const imagePlaceholder = 'assets/img/image-placeholder.png';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnDestroy, OnInit {
    @ViewChild('pdfInput', { static: false }) pdfInput: ElementRef;
    @ViewChild('mp3Input', { static: false }) mp3Input: ElementRef;

    readonly AUDIO_PUBLICATION: string = 'AudioPublication';
    readonly image: BehaviorSubject<ImageModel> = new BehaviorSubject<ImageModel>(new ImageModel({
        id: 0,
        originalPath: imagePlaceholder,
        compactPath: imagePlaceholder
    }));

    readonly names: BehaviorSubject<any>;
    readonly page: OtherFilesPages;
    readonly selectTypePlaceholder: string;
    readonly ofId: number;

    readonly cofForm: FormGroup = new FormGroup({
        name: new FormControl(
            null,
            [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(250),
                Validators.pattern('(^(?!\\s+$).+)')
            ]),
        fileType: new FormControl(null, [Validators.required]),
        imageId: new FormControl(null, [Validators.required]),
        fileId: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        availableFree: new FormControl(null, [Validators.required])
    });

    readonly otherFileTypes: OtherFilesDropdownItem[] = [];
    readonly subscription: Subscription = new Subscription();

    constructor(
        private cdr: ChangeDetectorRef,
        private ofService: OtherFilesService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private uploadService: UploadService) {

        this.createTypesDropdownItems();
        this.page = this.activatedRoute.snapshot.data.page;
        this.selectTypePlaceholder = this.page === OtherFilesPages.Edit ? '' : 'Select Type';

        if (this.page === OtherFilesPages.Edit) {
            this.fillForm(this.activatedRoute.snapshot.data.otherFile);
            this.ofId = this.activatedRoute.snapshot.data.otherFile.id;
            this.cofForm.get('fileType').disable();
        }

        this.names = new BehaviorSubject(this.initNames());
    }

    ngOnInit(): void {
        const sub1 = this.cofForm.get('fileType').valueChanges
            .subscribe((v: string) => {
                if (this.pdfInput) {
                    this.pdfInput.nativeElement.value = '';
                }

                if (this.mp3Input) {
                    this.mp3Input.nativeElement.value = '';
                }

                this.cofForm.get('fileId').setValue(undefined);
                this.names.next(this.initNames());
            });

        const sub2 = this.cofForm.valueChanges
            .subscribe(() => this.cdr.detectChanges());

        this.subscription.add(sub1);
        this.subscription.add(sub2);
    }

    private createTypesDropdownItems(): void {
        Object.keys(OtherFilesTypes).forEach((key: string) => {
            this.otherFileTypes.push({value: key, display: OtherFilesTypes[key]});
        });
    }

    private fillForm({name, fileType, preview, file, description, availableFree}: OtherFileModel): void {
        this.cofForm.get('name').setValue(name);
        this.cofForm.get('fileType').setValue(fileType);
        this.cofForm.get('imageId').setValue(preview.id);
        this.cofForm.get('fileId').setValue(file.id);
        this.cofForm.get('description').setValue(description);
        this.cofForm.get('availableFree').setValue(availableFree);
        this.image.next(preview);
    }

    onImageChange(event: any): void {
        const target = event.target || event.srcElement;
        const file = target.files[0];
        const body = new FormData();

        body.append('file', file);

        if (file === undefined) {
            this.cofForm.get('imageId').setValue(0);
            this.image.next(undefined);
            return;
        }

        this.uploadService.uploadImage(body, 'Image')
            .subscribe((data) => {
                this.cofForm.get('imageId').setValue(data.id);
                this.image.next(data);
            });
    }

    onSubmit(): void {
        const { fileType, name, description, fileId, availableFree } = this.cofForm.value;

        const payload: OtherFileDto = {
            fileType,
            name,
            description,
            fileId,
            availableFree,
            previewId: this.cofForm.value.imageId,
        };
        if (this.page === OtherFilesPages.Edit) {
            this.ofService.editOtherFile(payload, this.ofId)
                .subscribe(() => this.router.navigate(['/other-files']));
        } else {
            this.ofService.createOtherFile(payload)
                .subscribe(() => this.router.navigate(['/other-files']));
        }
    }

    validateControl(control: AbstractControl, name: string): string {
        let error = '';

        if (!control.valid) {
            Object.keys(control.errors).forEach((k) => {
                error = formErrorsMap[name][k];
            });
        }

        return error;
    }

    onFileChange(event: Event, type: string) {
        const target = event.target || event.srcElement;
        const file = (target as HTMLInputElement).files[0];
        const body = new FormData();
        body.append('file', file);

        if (file === undefined) {
            this.cofForm.get('fileId').setValue(undefined);
            return;
        }

        this.uploadService.uploadFile(body, type)
            .subscribe(data => {
                this.cofForm.get('fileId').setValue(data.id);
            },
            (error) => {
                this.mp3Input.nativeElement.value = null;
                this.cofForm.get('fileId').setValue(undefined);
            });
    }

    initNames() {
        const namesConfig = createFilesNames(OtherFilesPages[this.page]);
        const typeControl = this.cofForm.get('fileType').value;
        const foundConfig = namesConfig.find(c => c.key === typeControl);

        return foundConfig ? foundConfig : namesConfig.find(c => c.key === 'default');
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
