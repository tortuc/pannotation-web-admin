import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../../guards/auth-guard';

export const SettingsRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SettingsComponent
    },
];
