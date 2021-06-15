import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, debounceTime, map, shareReplay } from 'rxjs/operators';
import { Table, CommonUrlFilter } from 'src/app/libs/tables';
import { PAGE_SIZE } from '../../app.constants';
import { Subscription, Observable } from 'rxjs';
import { Order } from 'src/app/models/order/order-item';
import { OrdersService } from 'src/app/services/orders.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateFilter } from 'src/app/libs/tables/date-filter';
import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

const minSearchLength = 3;

@Component({
    selector: 'app-orders-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit, OnDestroy {
    searchControl = new FormControl(this.activatedRoute.snapshot.queryParams.q);
    ordersTable: Table<Order, DateFilter>;
    urlFilter: CommonUrlFilter<DateFilter>;
    pageIndex: number;
    filterChanges: Observable<DateFilter>;
    ordersList: Observable<Order[]>;
    limit = PAGE_SIZE;
    offset = 0;
    currentOffset = 0;
    q: string;

    private readonly subscription = new Subscription();

    hoveredDate: NgbDate;
    fromDateNg: NgbDate;
    toDateNg: NgbDate;
    fromDate: string;
    toDate: string;
    fullDate = 'yyyy-mm-dd';

    constructor(private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly ordersService: OrdersService,
        protected readonly calendar: NgbCalendar) {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.ordersTable.disconnect();
    }

    onDateSelection(date: NgbDate) {
        if (!this.fromDateNg && !this.toDateNg) {
            this.fromDateNg = date;
        } else if (this.fromDateNg && !this.toDateNg && !date.before(this.fromDateNg)) {
            this.toDateNg = date;
            const fromDate = `${this.fromDateNg.year}-${this.fromDateNg.month}-${this.fromDateNg.day}`;
            const toDate = `${this.toDateNg.year}-${this.toDateNg.month}-${this.toDateNg.day}`;
            this.fullDate = `${fromDate} - ${toDate}`;

            this.fromDate = fromDate;
            this.toDate = toDate;

            const paramMap = this.activatedRoute.snapshot.queryParamMap;

            this.urlFilter.setKeys({
                q: this.q,
                offset: this.currentOffset - this.limit,
                limit: this.limit,
                dateFrom: fromDate,
                dateTo: toDate,
                orderBy: paramMap.get('orderBy') ? paramMap.get('orderBy') : undefined,
                orderType: paramMap.get('orderType') ? paramMap.get('orderType') : undefined,
            }, false);
        } else {
            this.toDateNg = null;
            this.fromDateNg = date;
        }
    }

    getFile() {
        this.ordersService.getFile({
            q: this.q,
            offset: null,
            limit: null,
            dateFrom: this.fromDate,
            dateTo: this.toDate
        }).subscribe((data: HttpResponse<Blob>) => {
            let fileNameString = data.headers.get('Content-Disposition');
            if (fileNameString) {
                fileNameString = fileNameString.split('filename=').pop().split('; filename*=')[0];
                if (fileNameString) { saveAs(data.body, fileNameString); }
            }
        });
    }

    closeFix(event, datePicker) {
        if (event.target.offsetParent == null) {
            datePicker.close();
        } else if (event.target.offsetParent.tagName !== 'NGB-DATEPICKER' && event.target.offsetParent.id !== 'date-picker') {
            datePicker.close();
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDateNg && !this.toDateNg && this.hoveredDate && date.after(this.fromDateNg) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return date.after(this.fromDateNg) && date.before(this.toDateNg);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDateNg) || date.equals(this.toDateNg) || this.isInside(date) || this.isHovered(date);
    }

    getAll() {
        this.destroyAllParams();
    }

    destroyAllParams() {
        this.toDate = undefined;
        this.fromDate = undefined;
        this.fromDateNg = undefined;
        this.toDateNg = undefined;
        this.fullDate = 'yyyy-mm-dd';
        const paramMap = this.activatedRoute.snapshot.queryParamMap;

        this.urlFilter.setKeys({
            q: this.q,
            offset: this.currentOffset - this.limit,
            limit: this.limit,
            dateFrom: this.fromDate,
            dateTo: this.toDate,
            orderBy: paramMap.get('orderBy') ? paramMap.get('orderBy') : undefined,
            orderType: paramMap.get('orderType') ? paramMap.get('orderType') : undefined,
        }, false);
    }

    ngOnInit(): void {
        this.filterChanges = this.activatedRoute
            .queryParamMap
            .pipe(
                map((paramMap) => {
                    const offset = paramMap.has('offset') ? parseInt(paramMap.get('offset'), 10) : this.offset;
                    const limit = paramMap.has('limit') ? parseInt(paramMap.get('limit'), 10) : this.limit;
                    this.fromDate = paramMap.has('dateFrom') ? paramMap.get('dateFrom') : this.fromDate;
                    this.toDate = paramMap.has('dateTo') ? paramMap.get('dateTo') : this.toDate;
                    // tslint:disable-next-line: max-line-length
                    this.fullDate = (paramMap.has('dateFrom') && paramMap.has('dateTo')) ? `${this.fromDate} - ${this.toDate}` : this.fullDate;
                    this.currentOffset = offset;
                    this.pageIndex = offset / limit + 1;
                    this.q = paramMap.get('q') ? paramMap.get('q') : '';
                    return {
                        offset,
                        limit,
                        orderBy: paramMap.get('orderBy') ? paramMap.get('orderBy') : 'Id',
                        orderType: paramMap.get('orderType') ? paramMap.get('orderType') : 'desc',
                        q: this.q,
                        dateFrom: this.fromDate,
                        dateTo: this.toDate
                    } as DateFilter;
                }),
                shareReplay()
            );

        this.urlFilter = new CommonUrlFilter<DateFilter>(this.router);

        this.ordersTable = new Table(this.ordersService, this.filterChanges);

        const searchSub = this.searchControl.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(300)
            )
            .subscribe((val) => {
                if (val.length === 0 || val.length >= minSearchLength) {
                    this.q = val;
                    this.urlFilter.setKeys({
                        q: val,
                        offset: 0,
                        limit: this.limit,
                        dateFrom: this.fromDate,
                        dateTo: this.toDate
                    }, false);
                }

                const q = this.activatedRoute.snapshot.queryParams.q;
                if (q && q.length >= minSearchLength && val.length < minSearchLength) {
                    this.urlFilter.setKeys({
                        q: '',
                        offset: 0,
                        limit: this.limit,
                        dateFrom: this.fromDate,
                        dateTo: this.toDate
                    }, false);
                }
            });
        this.subscription.add(searchSub);

        this.ordersList = this.ordersTable.connect();
    }
}
