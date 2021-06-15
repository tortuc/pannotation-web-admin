import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CommonFilter, ListResponse, Pagination } from '../libs/tables';
import { PayoutRequest } from '../models/payout-request/payout-request';

@Injectable()
export class WithdrawRequestService {
    private API_URL = '/admins/withdraw-requests';

    constructor(private readonly httpClient: HttpClient) {
    }

    findList (filter: CommonFilter): Observable<ListResponse<PayoutRequest, Pagination>> {
        let params = new HttpParams();
        Object.keys(filter).forEach((key) => {
            if (filter[key]) {
                params = params.append(key, filter[key]);
            }
        });

        return this.httpClient
            .get<ListResponse<PayoutRequest, Pagination>>(this.API_URL, { params })
            .pipe(
                map((data: ListResponse<PayoutRequest, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: {  totalCount: 0 }})),
            );
    }

    changeStatus(request: PayoutRequest, status: number) {
        return this.httpClient.patch(`${this.API_URL}/${request.id}`, { status });
    }
}
