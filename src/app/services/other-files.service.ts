import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { ResponseModel } from '../models/response/response';
import { OtherFileModel } from '../models/other-files/other-file-model';
import { OtherFile, OtherFileDto } from '../models/other-files/other-file';
import { fromPromise } from 'rxjs/internal-compatibility';
import { CommonFilter, Pagination, ListResponse } from '../libs/tables';
import { OtherFilesFilter } from '../libs/tables/other-files-filter';
import { FiltersHelper } from '../core/filter.helper';

@Injectable()
export class OtherFilesService {
    private API_URL = '/admin-otherfiles';

    constructor(private readonly httpClient: HttpClient) {
    }

    findList(filter: OtherFilesFilter): Observable<ListResponse<OtherFile, Pagination>> {
        const params = FiltersHelper.toHttpParams(filter);

        return this.httpClient
            .get<ListResponse<OtherFile, Pagination>>(this.API_URL, { params })
            .pipe(
                map((data: ListResponse<OtherFile, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    createOtherFile(payload: OtherFileDto): Observable<OtherFileModel> {
        return this.httpClient.post<ResponseModel<OtherFileModel>>(this.API_URL, { ...payload })
            .pipe(map(({ data }) => data));
    }

    editOtherFile(payload: OtherFileDto, id: number): Observable<OtherFileModel> {
        return this.httpClient.put<ResponseModel<OtherFileModel>>(`${this.API_URL}/${id}`, { ...payload })
            .pipe(map(({ data }) => data));
    }

    getOne(id: number): Observable<OtherFileModel> {
        return this.httpClient.get<ResponseModel<OtherFile>>(`${this.API_URL}/${id}`)
            .pipe(map(({data}) => new OtherFileModel(data)));
    }

    getFile(filePath: string): Observable<Blob> {
        return defer(() => fromPromise(fetch(filePath).then(r => r.blob())));
    }

    deleteOtherFile(id: number): Observable<Object> {
        return this.httpClient.delete(`${this.API_URL}/${id}`);
    }

    getPrivateFile(filePath: string): Observable<Blob> {
        return this.httpClient.get(`${filePath}`, { responseType: 'blob' });
    }
}
