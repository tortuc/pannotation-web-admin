import { Routes } from '@angular/router';

import { SongsheetEditorComponent } from './songsheet-editor.component';
import { SongsheetResolver } from 'src/app/resolvers/songsheet.resolver';

export const SongsheetEditorRouter: Routes = [
    {
        path: 'create',
        component: SongsheetEditorComponent,
        data: {
            breadcrumb: 'Create'
        }
    },
    {
        path: ':id/edit',
        component: SongsheetEditorComponent,
        resolve: {
            currentSongsheet: SongsheetResolver,
        },
        data: {
            breadcrumb: 'Edit'
        }
    }
];
