import { Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { AuthGuard } from '../../../guards/auth-guard';

export const ChangePasswordRouter: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: FormComponent
    }
];
