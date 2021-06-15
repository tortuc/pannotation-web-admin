import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';

import { SessionStorage } from '../core/session/session-storage';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private readonly sessionStorage: SessionStorage,
                private readonly router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.sessionStorage.restore()) {
            this.router.navigate(['/sign-in']);
            return;
        }
        return true;
    }

    canLoad(route: Route, segments: UrlSegment[]):  boolean {
        if (!this.sessionStorage.restore()) {
            this.router.navigate(['/sign-in']);
            return;
        }
        return true;
    }
}
