import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CommonFilter, ListResponse, Pagination, FindList } from '../libs/tables';
import { User } from '../models/user/user';
import { UserModel } from '../models/user/user-model';
import { ResponseModel } from '../models/response/response';
import { FiltersHelper } from '../core/filter.helper';

@Injectable()
export class UsersService implements FindList<User, CommonFilter> {
    private API_URL = '/admin-users';

    constructor(private readonly httpClient: HttpClient) {
    }

    findList(filter: CommonFilter): Observable<ListResponse<User, Pagination>> {
        let params = FiltersHelper.toHttpParams(filter);

        return this.httpClient
            .get<ListResponse<User, Pagination>>(this.API_URL, { params })
            .pipe(
                map((data: ListResponse<User, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    changeState(user: User) {
        return this.httpClient.patch(`${this.API_URL}/${user.id}`, null);
    }

    deleteUser(user: User) {
        return this.httpClient.delete(`${this.API_URL}/${user.id}`);
    }

    getOne(id: number): Observable<UserModel> {
        const API_URL = '/admin-users';
        return this.httpClient
            .get<ResponseModel<UserModel>>(`${API_URL}/${id}`)
            .pipe(map((response: ResponseModel<UserModel>) => new UserModel(response.data)));
    }
}
