import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BreadcrumbService } from 'angular-crumbs';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { map, shareReplay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import { OtherFileModel } from '../../../../models/other-files/other-file-model';
import { OtherFilesTypes } from '../../../../core/enums/other-files-types';
import { OtherFilesService } from '../../../../services/other-files.service';

const imagePlaceholder = 'assets/img/image-placeholder.png';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
    readonly otherFile: OtherFileModel;
    readonly AUDIO_PUBLICATION: string = 'AudioPublication';
    readonly otherFileImage = new BehaviorSubject<string>(imagePlaceholder);
    readonly audio: Observable<any>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private ofService: OtherFilesService,
        private router: Router,
        private sanitizer: DomSanitizer,
        @Inject(DOCUMENT) private readonly document: Document,
        private cdr: ChangeDetectorRef,
        private breadcrumbService: BreadcrumbService) {
        this.otherFile = this.activatedRoute.snapshot.data.otherFile;
        this.audio = this.ofService.getPrivateFile(this.otherFile.file.path)
            .pipe(map((b: Blob) => {
                return sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(b));
            }), shareReplay());
    }

    ngOnInit() {
        this.initOtherFileImage();
        this.changeBreadcrumb();
    }

    private initOtherFileImage(): void {
        if (this.otherFile.preview && this.otherFile.preview.originalPath) {
            this.otherFileImage.next(this.otherFile.preview.originalPath);
        }
    }

    private changeBreadcrumb(): void {
        this.breadcrumbService.changeBreadcrumb(this.activatedRoute.snapshot, OtherFilesTypes[this.otherFile.fileType]);
        this.cdr.detectChanges();
    }

    getFile(path: string): void {
        this.ofService.getPrivateFile(path)
            .subscribe((data: Blob) => {
                const a: HTMLAnchorElement = this.document.createElement('a') as HTMLAnchorElement;
                const urL: string = URL.createObjectURL(data);

                a.href = urL;
                a.download = path.split('/').pop();

                this.document.body.appendChild(a);
                a.click();

                URL.revokeObjectURL(urL);
                this.document.body.removeChild(a);
            });
    }

    onDelete(id: number): void {
        this.ofService.deleteOtherFile(id)
            .subscribe(() => this.router.navigate(['/other-files']));
    }
}
