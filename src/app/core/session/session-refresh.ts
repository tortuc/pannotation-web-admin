import { HttpEventType, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { API_URL_TOKEN } from 'src/app/libs/remote';
import { ResponseModel } from 'src/app/models/response/response';
import { AppUser } from './app-user';
import { SessionRefresher } from '../../libs/authenticated';
import { SessionStorage } from './session-storage';
import { Session } from '../../models/sessions/session';

@Injectable()
export class RefreshSessionService implements SessionRefresher<AppUser> {
    private endpoint = '/admin-sessions';

    constructor(private readonly sessionStorage: SessionStorage,
                @Inject(API_URL_TOKEN) private readonly apiUrl: string) {
    }

    private get endpointUrl(): string {
        return this.apiUrl + this.endpoint;
    }

    refresh(handler: HttpHandler, refreshToken: string): Observable<AppUser> {
        const request = new HttpRequest('PUT', this.endpointUrl, { refreshToken });
        return handler.handle(request)
            .pipe(
                filter((event) => event.type === HttpEventType.Response),
                map((response: HttpResponse<ResponseModel<Session>>) => {
                    const user = this.sessionStorage.restore();

                    if (user) {
                        return new AppUser(Object.assign(user, response.body.data));
                    }

                    return new AppUser(Object.assign({
                        id: 0,
                        email: ''
                    }, response.body.data));
                })
            );
    }
}
