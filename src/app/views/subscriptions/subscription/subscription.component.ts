import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SubscriptionDetails } from 'src/app/models/subscription/subscription-details';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { BehaviorSubject, of } from 'rxjs';
import { UsersHelper } from '../../users/users-helper';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionComponent implements OnInit {
  subscription: SubscriptionDetails;
  readonly isActive = new BehaviorSubject<boolean>(false);

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly subscriptionService: SubscriptionsService,
    private readonly usersHelper: UsersHelper) { 
    }

  ngOnInit() {
    this.initSubscription();
  }

  initSubscription(): void {
    this.subscription = this.activatedRoute.snapshot.data.subscription;

    if (this.subscription.nextPaymentDate != null) {
      let date = new Date(this.subscription.nextPaymentDate);
      this.isActive.next(date > new Date());
    }
  }

  unsubscribe(event: any): void {
    event.preventDefault();
        if (event.target.checked === false) {
            this.usersHelper.unsubscribeUser()
                .subscribe((result) => {
                    if (result === true) {
                        event.target.checked = false;
                        this.subscriptionService.unsubscribe(this.subscription.userId)
                            .pipe(
                                catchError(() => {
                                    this.isActive.next(true);
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
