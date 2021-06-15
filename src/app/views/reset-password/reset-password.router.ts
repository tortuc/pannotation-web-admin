import { Routes } from '@angular/router';

import { ResetPasswordComponent } from './form/form.component';
import { IsAuthGuard } from 'src/app/guards/is-auth.guard';

export const ResetPasswordRouter: Routes = [
    {
        path: '',
        component: ResetPasswordComponent,
        canActivate: [IsAuthGuard]
    }
];
