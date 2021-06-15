import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response/response';
import { NewPassword } from '../models/new-password/new-password';

@Injectable()
export class AdminService {
    private API_URL = '/admins';

    constructor(private readonly httpClient: HttpClient) {
    }

    changePassword(newPassword: NewPassword): Observable<null> {
        return this.httpClient
            .put<ResponseModel<null>>(this.API_URL + '/me/password', newPassword)
            .pipe(map(() => null));
    }
}
