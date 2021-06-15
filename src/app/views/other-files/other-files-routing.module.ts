import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth-guard';
import { OtherFilesListComponent } from './other-files-list/other-files-list.component';

export const routes: Routes = [
    {
        path: '',
        component: OtherFilesListComponent,
        data: { breadcrumb: 'Other Files'}
    },
    {
        path: '',
        loadChildren: () => import('./other-files-views/other-files-views.module')
            .then(m => m.OtherFilesViewsModule)
    }
    /*{
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
        data: {breadcrumb: 'Songsheet'}
    },*/
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class OtherFilesRoutingModule {
}
