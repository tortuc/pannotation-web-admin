import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Event, NavigationStart, Router } from '@angular/router';
import { map, share } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { SessionStorage } from '../../core/session/session-storage';
import { AppUser } from '../../core/session/app-user';
import { User } from '../../models/user/user';
import { detectBody } from './main.helper';
import { AuthService } from 'src/app/services/auth.service';

enum SidenavMode {
    Side = 'side',
    Over = 'over'
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
    sidenavMode: Observable<SidenavMode>;
    fullScreen: Observable<boolean>;
    isLoggedIn: Observable<boolean>;
    user: Observable<AppUser | undefined>;
    currentUser: User;
    private signOutSubscription: Subscription;

    constructor(
        private readonly breakpointObserver: BreakpointObserver,
        private readonly sessionStorage: SessionStorage,
        private readonly router: Router,
        private readonly authService: AuthService
    ) {
    }

    ngOnInit(): void {
        detectBody();
        this.fullScreen = this.breakpointObserver.observe(Breakpoints.Large).pipe(
            map((val) => val.matches),
            share()
        );

        this.sidenavMode = this.fullScreen.pipe(
            map((isFull) => isFull ? SidenavMode.Side : SidenavMode.Over),
            share()
        );

        this.user = this.sessionStorage.userChanges;
        this.isLoggedIn = this.sessionStorage.userChanges
            .pipe(
                map((user) => {
                    this.currentUser = user;
                    return !!user;
                })
            );

        // subscribe on router's events
        this.signOutSubscription = this.router.events.subscribe((event: Event) => {
            // checks if routing to start and compares with 'sign-out' url
            if (event instanceof NavigationStart && event.url === '/sign-out') {
                // if routing is equal 'sign-out' it must destroy session storage and redirect to 'sign-in' route
                // call logout api
                this.authService.logout()
                    .subscribe(() => {
                        // destroy session
                        this.sessionStorage.destroy();
                        // redirect to sign-in url
                        this.router.navigate(['/sign-in']);
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.signOutSubscription.unsubscribe();
    }

    @HostListener('window:resize', ['$event'])
    private onResize() {
        detectBody();
    }
}
