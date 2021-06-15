import { Routes } from '@angular/router';
import { SongsheetsListComponent } from './list/list.component';
import { AuthGuard } from '../../guards/auth-guard';
import { SongsheetComponent } from './songsheet/songsheet.component';
import { SongsheetResolver } from '../../resolvers/songsheet.resolver';

export const SongsheetsRoute: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SongsheetsListComponent,
        data: { breadcrumb: 'Music Scores'}
    },
    {
        path: '',
        loadChildren: () => import('./songsheet-editor/songsheet-editor.module')
            .then(m => m.SongsheetEditorModule),
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        resolve: {
            songsheet: SongsheetResolver,
        },
        component: SongsheetComponent,
        data: { breadcrumb: 'Music Score'}
    },
];
