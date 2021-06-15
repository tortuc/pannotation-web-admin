import { Routes } from '@angular/router';

import { UsersListComponent } from './list/list.component';
import { AuthGuard } from '../../guards/auth-guard';
import { UserComponent } from './user/user.component';
import { UserResolver } from '../../resolvers/user.resolver';

export const UsersRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: UsersListComponent,
        data: { breadcrumb: 'Users'}
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        resolve: {
            user: UserResolver,
        },
        component: UserComponent,
        data: { breadcrumb: 'User' }
    },
];
