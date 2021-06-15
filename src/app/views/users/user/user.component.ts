import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { User } from '../../../models/user/user';
import { UsersHelper } from '../users-helper';
import { UploadService } from 'src/app/services/uploads.service';
import { SafeUrl } from '@angular/platform-browser';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

    isProvider = false;
    user: User;
    avatarImage: Observable<SafeUrl>;
    readonly isSubscriptionActive = new BehaviorSubject<boolean>(false);

    constructor(private readonly activatedRoute: ActivatedRoute,
        private readonly cdr: ChangeDetectorRef,
        private readonly router: Router,
        private readonly uploadService: UploadService,
        private readonly usersHelper: UsersHelper,
        private readonly subscriptionService: SubscriptionsService) {
    }

    ngOnInit(): void {
        this.initUser();
    }

    initUser(): void {
        this.user = this.activatedRoute.snapshot.data.user;
        if (this.user.avatar && this.user.avatar.compactPath) {
            this.avatarImage = this.uploadService.getImage(this.user.avatar.compactPath);
        } else {
            this.avatarImage = undefined;
        }

        console.log(this.user);
        this.isSubscriptionActive.next(this.user.isSubscribed && !this.user.shouldCancelSubscription);
    }

    changeState(user: User) {
        this.usersHelper.changeState(user)
            .subscribe(() => {
                user.isBlocked = !user.isBlocked;
                this.cdr.detectChanges();
            });
    }

    unsubscribe(event: any): void {
        event.preventDefault();
        if (event.target.checked === false) {
            this.usersHelper.unsubscribeUser()
                .subscribe((result) => {
                    if (result === true) {
                        event.target.checked = false;
                        this.subscriptionService.unsubscribe(this.user.id)
                            .pipe(
                                catchError(() => {
                                    this.isSubscriptionActive.next(true);
                                    event.target.checked = true;
                                    return of(null)
                                })
                            )
                            .subscribe(() => {
                            });
                    }
                })
        }
    }
}
