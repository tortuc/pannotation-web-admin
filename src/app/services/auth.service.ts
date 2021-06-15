import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response/response';
import { Credentials } from '../models/credentials/credentials';
import { AppUser } from '../core/session/app-user';
import { UserModel } from '../models/user/user-model';

@Injectable()
export class AuthService {
    private API_URL = '/admin-sessions';

    constructor(private readonly httpClient: HttpClient) {
    }

    signIn(credentials: Credentials): Observable<AppUser> {
        return this.httpClient
            .post<ResponseModel<AppUser>>(this.API_URL, credentials)
            .pipe(
                map(({ data }: ResponseModel<AppUser>) => {
                    return new AppUser(data);
                })
            );
    }

    getProfile(): Observable<UserModel> {
        return this.httpClient
            .get(`/admin-users/me/profile`)
            .pipe(
                map(({ data }: ResponseModel<AppUser>) => {
                    return new UserModel(data);
                })
            );
    }

    logout(): Observable<null> {
        return this.httpClient
            .delete<ResponseModel<AppUser>>(this.API_URL)
            .pipe(
                map(() => null)
            );
    }
}
