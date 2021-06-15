import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { map, shareReplay, switchMap, distinctUntilChanged, debounceTime, timeout } from 'rxjs/internal/operators';
import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, BehaviorSubject } from 'rxjs';

import { CommonFilter, Table } from '../../../libs/tables';
import { Songsheet } from '../../../models/songsheet/songsheet';
import { SongsheetsService } from '../../../services/songsheets.service';
import { ConfirmationDialogComponent } from '../../modals/confirmation-dialog/confirmation-dialog.component';
import { CommonUrlFilter } from '../../../libs/tables';
import { FormControl } from '@angular/forms';
import { PAGE_SIZE } from 'src/app/views/app.constants';

@Component({
    selector: 'app-songsheets-table',
    templateUrl: './songsheets-table.component.html',
    styleUrls: ['./songsheets-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsheetsTableComponent implements OnInit, OnDestroy {

    @Input() events: Observable<string>;
    @Input() term: string;

    songsheetsTable: Table<Songsheet, CommonFilter>;
    pageIndex: number;
    urlFilter: CommonUrlFilter<CommonFilter>;
    filterChanges: Observable<CommonFilter>;
    songsheetsList: Observable<Songsheet[]>;
    imagePlaceholder = 'assets/img/image-placeholder.png';
    limit = PAGE_SIZE;
    offset = 0;
    currentOffset = 0;
    q: string;

    private eventsSubscription: any

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router,
                private readonly modalService: BsModalService,
                private readonly songsheetsService: SongsheetsService,
                private readonly cdr: ChangeDetectorRef) {
    }
    
    ngOnDestroy(): void {        
        this.eventsSubscription.unsubscribe()
        this.songsheetsTable.disconnect();
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
                        q: this.term
                    } as CommonFilter;
                }),
                shareReplay()
            );

        this.urlFilter = new CommonUrlFilter<CommonFilter>(this.router);

        this.songsheetsTable = new Table(this.songsheetsService, this.filterChanges);
        this.songsheetsList = this.songsheetsTable.connect();

        this.eventsSubscription = this.events.subscribe((val) =>  {
            this.term = val;
            this.urlFilter.setKeys({
                q: val,
                offset: 0,
                limit: this.limit,
            }, false);
        });
    }  

    changeTopState(id:number){
        this.songsheetsService.changeTopState(id).subscribe(() => {
            this.songsheetsTable.refresh();
        });
    }

    // changeState(songsheet: Songsheet) {

    //     const modalRef = this.modalService.show(ConfirmationDialogComponent, <ModalOptions> {
    //         initialState: {
    //             data: {
    //                 title: songsheet.isBlocked ? 'Unblock Songsheet' : 'Block Songsheet',
    //                 message: 'Are you sure?'
    //             }
    //         }
    //     });

    //     modalRef.content.result.pipe(switchMap(result => {
    //         if (result) {
    //             return this.songsheetsService.changeState(songsheet);
    //         }
    //         return EMPTY;
    //     })).subscribe(() => {
    //         songsheet.isBlocked = !songsheet.isBlocked;
    //         this.cdr.detectChanges();
    //     });
    // }

    delete(songsheet: Songsheet) {

        const modalRef = this.modalService.show(ConfirmationDialogComponent, <ModalOptions> {
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
            this.songsheetsTable.refresh();
            this.cdr.detectChanges();
        });
    }
}
