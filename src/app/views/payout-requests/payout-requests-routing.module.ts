import { Routes } from '@angular/router';
import { PayoutRequestsListComponent } from './list/list.component';
import { AuthGuard } from '../../guards/auth-guard';

export const PayoutRequestsRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: PayoutRequestsListComponent
    },
];
