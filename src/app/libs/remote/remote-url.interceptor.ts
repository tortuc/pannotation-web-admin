import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL_TOKEN } from './tokens';

@Injectable()
export class RemoteUrlInterceptor implements HttpInterceptor {
    private readonly remoteUrlPattern = /^http[s]?:\/\//i;

    // use authentication for every local API
    private isInnerRequest(url: string): boolean {
        return !this.remoteUrlPattern.test(url);
    }

    constructor(@Inject(API_URL_TOKEN) private readonly apiUrl: string) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;

        if (this.apiUrl && this.isInnerRequest(req.url)) {
            request = req.clone({
                url: [this.apiUrl, req.url].join('')
            });
        }

        return next.handle(request);
    }
}
