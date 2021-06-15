import { HttpRequest } from '@angular/common/http';

import { ShouldAuthenticate } from '../libs/authenticated';

export class ApiUrlMatcher implements ShouldAuthenticate {
    private readonly remoteUrlPattern = /^https?:\/\//i;

    // use authentication for every local API
    private isInnerRequest(url: string): boolean {
        return !this.remoteUrlPattern.test(url);
    }

    shouldAuthenticate(req: HttpRequest<any>): boolean {
        return this.isInnerRequest(req.url);
    }
}
