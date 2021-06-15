import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, EMPTY } from 'rxjs';

import { Songsheet } from '../../../models/songsheet/songsheet';
import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import { ConfirmationDialogComponent } from 'src/app/components/modals/confirmation-dialog/confirmation-dialog.component';
import { switchMap } from 'rxjs/operators';
import { SongsheetsService } from 'src/app/services/songsheets.service';
import { UploadService } from '../../../services/uploads.service';

const imagePlaceholder = 'assets/img/image-placeholder.png';
const avatarPlaceholder = 'assets/img/avatar-placeholder.jpg';

@Component({
    selector: 'app-songsheet',
    templateUrl: './songsheet.component.html',
    styleUrls: ['./songsheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsheetComponent implements OnInit {
    songsheet: Songsheet;
    songsheetImage = new BehaviorSubject<string>(imagePlaceholder);
    providerImage = new BehaviorSubject<string>(avatarPlaceholder);

    constructor(private readonly activatedRoute: ActivatedRoute,
        private readonly modalService: BsModalService,
        private readonly songsheetsService: SongsheetsService,
        private readonly uploadService: UploadService,
        private readonly router: Router) {
    }

    ngOnInit(): void {
        this.initSongsheet();
    }

    initSongsheet(): void {
        this.songsheet = this.activatedRoute.snapshot.data.songsheet;

        if (this.songsheet.image && this.songsheet.image.originalPath) {
            this.songsheetImage.next(this.songsheet.image.originalPath);
        }
        // if (this.songsheet.provider && this.songsheet.provider.avatar && this.songsheet.provider.avatar.originalPath) {
        //     this.providerImage.next(this.songsheet.provider.avatar.originalPath);
        // }
    }

    getFile(path: string): void {
        this.uploadService.getFile(path).subscribe((data) => {
            const a = data;
        });
    }

    delete(songsheet: Songsheet) {

        const modalRef = this.modalService.show(ConfirmationDialogComponent, <ModalOptions>{
            initialState: {
                data: {
                    title: 'Delete Music Score',
                    message: 'Are you sure?'
                }
            }
        });

        modalRef.content.result.pipe(switchMap(result => {
            if (result) {
                return this.songsheetsService.deleteSongsheet(songsheet);
            }
            return EMPTY;
        })).subscribe(() => {
            this.router.navigate(['/music-scores']);
        });
    }
}
