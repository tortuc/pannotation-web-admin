import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CommonFilter, ListResponse, Pagination } from '../libs/tables';
import { Songsheet } from '../models/songsheet/songsheet';
import { SongsheetModel } from '../models/songsheet/songsheet-model';
import { ResponseModel } from '../models/response/response';
import { FiltersHelper } from '../core/filter.helper';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { KeyValuePair } from '../models/response/key-value-pair';
import { KeyValuePairModel } from '../models/response/key-value-pair-model';
import { TypeModel } from '../models/songsheet/type-model';
import { FormModel } from '../views/reset-password/form/form.model';
import { SongsheetRequest } from '../models/songsheet/songsheet-request';

@Injectable()
export class SongsheetsService {
    private API_URL = '/admin-songsheets';

    constructor(private readonly httpClient: HttpClient,
        private sanitizer: DomSanitizer) {
    }

    findList(filter: CommonFilter): Observable<ListResponse<Songsheet, Pagination>> {
        let params = FiltersHelper.toHttpParams(filter);
        return this.httpClient
            .get<ListResponse<Songsheet, Pagination>>(this.API_URL, { params })
            .pipe(
                map((data: ListResponse<Songsheet, Pagination>) => {
                    return {
                        data: data.data,
                        pagination: data.pagination,
                    };
                }),
                // ignore error
                catchError(() => of({ data: [], pagination: { totalCount: 0 } })),
            );
    }

    getGenres(): Observable<Array<TypeModel>> {
        return this.httpClient
            .get<Response>('/songsheets/genres', { responseType: "json" })
            .pipe(
                map((data: any) => {
                    const keys = Object.keys(data.data);

                    const genres = Array<TypeModel>();

                    keys.forEach((key) => genres.push({ id: parseInt(key, 10), name: data.data[key] }));

                    return genres;
                })
            );
    }

    getInstruments(): Observable<Array<TypeModel>> {
        return this.httpClient
            .get<Response>('/songsheets/instruments', { responseType: "json" })
            .pipe(
                map((data: any) => {
                    const keys = Object.keys(data.data);

                    const genres = Array<TypeModel>();

                    keys.forEach((key) => genres.push({ id: parseInt(key, 10), name: data.data[key] }));

                    return genres;
                })
            );
    }

    changeTopState(id: number) {
        return this.httpClient.patch(`${this.API_URL}/${id}`, null);
    }

    create(songsheet: SongsheetRequest): Observable<Songsheet> {
        return this.httpClient.post<ResponseModel<Songsheet>>(`${this.API_URL}`, songsheet).pipe(
            map(({data}) => data)
        );
    }

    update(songsheet: SongsheetRequest) {
        return this.httpClient.put(`${this.API_URL}/${songsheet.id}`, songsheet);
    }

    deleteSongsheet(songsheet: Songsheet) {
        return this.httpClient.delete(`${this.API_URL}/${songsheet.id}`);
    }

    getSongsheet(songsheetId: number): Observable<SongsheetModel> {
        return this.httpClient
            .get<ResponseModel<SongsheetModel>>(`${this.API_URL}/${songsheetId}`)
            .pipe(
                map(({ data }: ResponseModel<SongsheetModel>) => new SongsheetModel(data))
            );
    }
}
