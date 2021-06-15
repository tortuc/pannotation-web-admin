import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Table, CommonUrlFilter } from 'src/app/libs/tables';
import { OtherFilesFilter } from 'src/app/libs/tables/other-files-filter';
import { OtherFile } from 'src/app/models/other-files/other-file';
import { PAGE_SIZE } from 'src/app/views/app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import { SongsheetsService } from 'src/app/services/songsheets.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { OtherFilesService } from 'src/app/services/other-files.service';
import { ConfirmationDialogComponent } from '../../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-other-files-table',
  templateUrl: './other-files-table.component.html',
  styleUrls: ['./other-files-table.component.scss']
})
export class OtherFilesTableComponent implements OnInit, OnDestroy {
    @Input() events: Observable<any>;
    @Input() term: string;

    otherFilesTable: Table<OtherFile, OtherFilesFilter>;
    pageIndex: number;
    urlFilter: CommonUrlFilter<OtherFilesFilter>;
    filterChanges: Observable<OtherFilesFilter>;
    otherFilesList: Observable<OtherFile[]>;
    imagePlaceholder = 'assets/img/image-placeholder.png';
    limit = PAGE_SIZE;
    offset = 0;
    currentOffset = 0;
    q: string;
    fileTypes: string[] = null;

    private eventsSubscription: any;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router,
                private readonly modalService: BsModalService,
                private readonly otherFilesService: OtherFilesService,
                private readonly cdr: ChangeDetectorRef) {
    }
    ngOnDestroy(): void {
        this.eventsSubscription.unsubscribe();
        this.otherFilesTable.disconnect();
    }

    ngOnInit(): void {
        this.filterChanges = this.activatedRoute
            .queryParamMap
            .pipe(
                map((paramMap) => {
                    const offset = paramMap.has('offset') ? parseInt(paramMap.get('offset'), 10) : this.offset;
                    const limit = paramMap.has('limit') ? parseInt(paramMap.get('limit'), 10) : this.limit;
                    this.pageIndex = offset / limit + 1;
                    this.currentOffset = offset;
                    return {
                        offset,
                        limit,
                        orderBy: paramMap.get('orderBy') ? paramMap.get('orderBy') : 'id',
                        orderType: paramMap.get('orderType') ? paramMap.get('orderType') : 'desc',
                        q: this.term,
                        fileTypes: this.fileTypes
                    } as OtherFilesFilter;
                }),
                shareReplay()
            );

        this.urlFilter = new CommonUrlFilter<OtherFilesFilter>(this.router);

        this.otherFilesTable = new Table(this.otherFilesService, this.filterChanges);
        this.otherFilesList = this.otherFilesTable.connect();

        this.eventsSubscription = this.events.subscribe((val) =>  {
            if (val.term !== undefined) {
                this.term = val.term;
            }

            if (val.fileType) {
                if (val.fileType.length === 0) {
                    this.fileTypes = null;
                } else {
                    this.fileTypes = val.fileType.map(x => x.value);
                }
            }

            this.urlFilter.setKeys({
                q: this.term,
                offset: 0,
                limit: this.limit,
                fileTypes: this.fileTypes
            }, false);
        });
    }

    delete(otherFile: OtherFile) {

        const modalRef = this.modalService.show(ConfirmationDialogComponent, <ModalOptions> {
            initialState: {
                data: {
                    title: 'Delete Other File',
                    message: 'Are you sure?'
                }
            }
        });

        modalRef.content.result.pipe(switchMap(result => {
            if (result) {
                return this.otherFilesService.deleteOtherFile(otherFile.id);
            }
            return EMPTY;
        })).subscribe(() => {
            this.otherFilesTable.refresh();
            this.cdr.detectChanges();
        });
    }

}
