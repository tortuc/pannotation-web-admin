import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CommonFilter, ListResponse, Pagination, FindList } from '../libs/tables';
import { ResponseModel } from '../models/response/response';
import { FiltersHelper } from '../core/filter.helper';
import { Order } from '../models/order/order-item';
import { OrderDetailsModel } from '../models/order/order-detail-model';
import { DateFilter } from '../libs/tables/date-filter';

@Injectable()
export class OrdersService implements FindList<Order, CommonFilter> {
    private API_URL = '/admin-orders';

    constructor(private readonly httpClient: HttpClient) {
    }

    getFile(filter: DateFilter): Observable<any> {
        const responseType = 'blob' as 'json';
        return this.httpClient.get(`${this.API_URL}/csv`, {
            params: FiltersHelper.toHttpParams(filter),
            observe: 'response',
            responseType
        }).pipe(map((data: HttpResponse<Blob>) => data));
    }

    findList(filter: CommonFilter): Observable<ListResponse<Order, Pagination>> {
        const params = FiltersHelper.toHttpParams(filter);

        return this.httpClient
            .get<ListResponse<Order, Pagination>>(this.API_URL, { params })
            .pipe(
                map((data: ListResponse<Order, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    getOne(orderId: number): Observable<OrderDetailsModel> {
        return this.httpClient
            .get<ResponseModel<OrderDetailsModel>>(`${this.API_URL}/${orderId}`)
            .pipe(
                map(({ data }) => data)
            );
    }
}
