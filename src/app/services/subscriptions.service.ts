import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DateFilter } from '../libs/tables/date-filter';
import { FiltersHelper } from '../core/filter.helper';
import { Observable, of } from 'rxjs';
import { SubscriptionItem } from '../models/subscription/subscription-item';
import { Pagination, ListResponse, CommonFilter } from '../libs/tables';
import { map, catchError } from 'rxjs/operators';
import { SubscriptionDetails } from '../models/subscription/subscription-details';
import { ResponseModel } from '../models/response/response';

@Injectable()
export class SubscriptionsService {
    private API_URL = '/admin-subscriptions';

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

    findList(filter: CommonFilter): Observable<ListResponse<SubscriptionItem, Pagination>> {
        const params = FiltersHelper.toHttpParams(filter);

        return this.httpClient
            .get<ListResponse<SubscriptionItem, Pagination>>(this.API_URL, { params })
            .pipe(
                map((data: ListResponse<SubscriptionItem, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    getOne(subscriptionId: number): Observable<SubscriptionDetails> {
        return this.httpClient
            .get<ResponseModel<SubscriptionDetails>>(`${this.API_URL}/${subscriptionId}`)
            .pipe(
                map(({ data }: ResponseModel<SubscriptionDetails>) => data)
            );
    }

    unsubscribe(userId: number): Observable<string> {
        return this.httpClient
            .post<ResponseModel<any>>(`${this.API_URL}/unsubscribe`, { userId })
            .pipe(
                map(({ data }: ResponseModel<any>) => data)
            );
    }
}
