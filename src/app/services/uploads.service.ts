import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ResponseModel } from '../models/response/response';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from '../models/image';
import { FileModel } from '../models/file/file-model';

@Injectable()
export class UploadService {
    private API_URL = '/upload';

    constructor(private readonly httpClient: HttpClient,
        private sanitizer: DomSanitizer) {
    }

    uploadImage(body: FormData, type: string): Observable<ImageModel> {
        return this.httpClient.post<ResponseModel<ImageModel>>(`${this.API_URL}/image?imageType=` + type, body).pipe(
            map(({data}) => data)
        );
    }

    uploadFile(body: FormData, type: string): Observable<FileModel> {
        return this.httpClient.post<ResponseModel<FileModel>>(`${this.API_URL}/file?fileType=` + type, body).pipe(
            map(({data}) => data)
        );
    }

    getFile(filePath: string) {
        // const API_URL = '/content/getfile';
        // `${API_URL}/${filePath}`.replace('https', 'http')}
        return this.httpClient.get(`${filePath}`, { responseType: 'blob' })
            .pipe(
                map((data) => {
                    const blob = new Blob([data], { type: 'application/pdf' });
                    const url = window.URL.createObjectURL(blob);
                    window.open(url);
                    // return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
                })
            );
    }

    getImage(filePath: string): Observable<SafeUrl> {
        return this.httpClient.get(`${filePath}`, {responseType: 'blob'})
            .pipe(
                map((data) => {
                    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data));
                })
            );
    }
}
