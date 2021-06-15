import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthGuard } from '../guards/auth-guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            // TODO: check if this module really needed
            {
                path: '',
                redirectTo: '/users',
                pathMatch: 'full'
            },
            {
                path: 'settings',
                loadChildren: () => import('../views/settings/settings.module')
                    .then(m => m.SettingsModule),
                data: { breadcrumb: 'Settings' }
            },
            {
                path: 'change-password',
                loadChildren: () => import('../views/settings/change-password/change-password.module')
                    .then(m => m.ChangePasswordModule),
                data: { breadcrumb: 'Change password' }
            },
            {
                path: 'users',
                loadChildren: () => import('../views/users/users.module')
                    .then(m => m.UsersModule),
                data: { breadcrumb: 'Users' }
            },
            {
                path: 'music-scores',
                loadChildren: () => import('../views/songsheets/songsheet.module')
                    .then(m => m.SongsheetModule),
                data: { breadcrumb: 'Music Scores' }
            },
            {
                path: 'orders', // TODO: probably this part should be redone
                loadChildren: () => import('../views/orders/order.module')
                    .then(m => m.OrderModule),
                data: { breadcrumb: 'Orders' }
            },
            {
                path: 'subscriptions',
                loadChildren: () => import('../views/subscriptions/subscriptions.module')
                    .then(m => m.SubscriptionsModule),
                data: { breadcrumb: 'Subscriptions' }
            },
            {
                path: 'other-files',
                canLoad: [AuthGuard],
                loadChildren: () => import('../views/other-files/other-files.module')
                    .then(m => m.OtherFilesModule),
                data: {breadcrumb: 'Other Files'}
            }
        ]
    },
    // add sign-out rout
    {
        path: 'sign-out'
    },
    {
        path: 'sign-in',
        loadChildren: () => import('../views/sign-in/sign-in.module')
            .then(m => m.SignInModule)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('../views/reset-password/reset-password.module')
            .then(m => m.ResetPasswordModule),
        data: { breadcrumb: 'Reset password' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
