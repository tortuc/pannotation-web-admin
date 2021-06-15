import { Routes } from '@angular/router';
import { OrdersListComponent } from './list/list.component';
import { AuthGuard } from '../../guards/auth-guard';
import { OrderComponent } from './order/order.component';
import { OrderResolver } from '../../resolvers/order.resolver';

export const OrdersRoute: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: OrdersListComponent, 
        data: { breadcrumb: 'Orders'}
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        resolve: {
            order: OrderResolver,
        },
        component: OrderComponent, 
        data: { breadcrumb: 'Order'}
    },
];
