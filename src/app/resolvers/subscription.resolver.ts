import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SubscriptionDetails } from '../models/subscription/subscription-details';
import { SubscriptionsService } from '../services/subscriptions.service';

@Injectable()
export class SubscriptionResolver implements Resolve<SubscriptionDetails> {
    constructor(private readonly subscriptionsService: SubscriptionsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubscriptionDetails> {
        const subscriptionId = parseInt(route.params.id, 10);

        return this.subscriptionsService.getOne(subscriptionId);
    }
}
