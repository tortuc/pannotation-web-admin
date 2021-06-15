import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { map, shareReplay } from 'rxjs/internal/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CommonFilter, Table } from '../../../libs/tables';
import { PayoutRequest } from '../../../models/payout-request/payout-request';
import { statusesValues } from '../../../models/payout-request/payout-request-statuses';
import { WithdrawRequestService } from '../../../services/withdraw-requests.service';
import { CommonUrlFilter } from '../../../libs/tables';

@Component({
    selector: 'app-payout-requests-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutRequestsListComponent implements OnInit, OnDestroy {
    payoutRequestsTable: Table<PayoutRequest, CommonFilter>;
    pageIndex: number;
    urlFilter: CommonUrlFilter<CommonFilter>;
    filterChanges: Observable<CommonFilter>;
    payoutRequestsList: Observable<PayoutRequest[]>;
    statusesValues = statusesValues;
    limit = 10;
    offset = 0;

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router,
                private readonly withdrawRequestService: WithdrawRequestService,
                private readonly cdr: ChangeDetectorRef) {
    }

    ngOnDestroy(): void {
        this.payoutRequestsTable.disconnect();
    }

    ngOnInit(): void {
        this.filterChanges = this.activatedRoute
        .queryParamMap
        .pipe(
            map((paramMap) => {
                const offset = paramMap.has('offset') ? parseInt(paramMap.get('offset'), 10) : this.offset;
                const limit = paramMap.has('limit') ? parseInt(paramMap.get('limit'), 10) : this.limit;
                this.pageIndex = offset / limit + 1;
                return {
                    offset,
                    limit
                } as CommonFilter;
            }),
            shareReplay()
        );

        this.urlFilter = new CommonUrlFilter<CommonFilter>(this.router);

        this.payoutRequestsTable = new Table(this.withdrawRequestService, this.filterChanges);
        this.payoutRequestsList = this.payoutRequestsTable.connect();
    }

    changeStatus( request, status) {
        this.withdrawRequestService.changeStatus(request, status)
            .subscribe(() => {
                request.status = status;
                this.cdr.detectChanges();
         });
    }
}
