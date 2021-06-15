import { Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth-guard';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionsListComponent } from './list/list.component';
import { SubscriptionResolver } from 'src/app/resolvers/subscription.resolver';

export const SubscriptionsRoute: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SubscriptionsListComponent,
        data: { breadcrumb: 'Subscriptions'}
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: SubscriptionComponent,
        resolve: {
            subscription: SubscriptionResolver,
        },
        data: { breadcrumb: 'Subscription'}
    },
];
