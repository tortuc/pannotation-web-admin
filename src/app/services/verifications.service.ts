import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class VerificationsService {
    private API_URL = '/admin-verifications';

    constructor(private readonly httpClient: HttpClient) {
    }

    reset(email: string): Observable<null> {
        return this.httpClient
            .post<null>(`${this.API_URL}/password`, { email });
    }

    restore(token: string, password: string): Observable<null> {
        return this.httpClient
            .put<null>(`${this.API_URL}/password`, { token, password });
    }

    verifyToken(token: string): Observable<null> {
        return this.httpClient
            .put<null>(`${this.API_URL}/token`, { token });
    }

}
