import { Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { IsAuthGuard } from 'src/app/guards/is-auth.guard';

export const SignInRouter: Routes = [
    {
        path: '',
        component: FormComponent,
        canActivate: [IsAuthGuard]
    }
];
