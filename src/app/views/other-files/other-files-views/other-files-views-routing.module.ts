import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { PreviewComponent } from './preview/preview.component';
import { OtherFileResolver } from '../../../resolvers/other-file.resolver';
import { OtherFilesPages } from './other-files-views.enum';

const routes: Routes = [
    {
        path: 'create',
        component: CreateComponent,
        data: {
            breadcrumb: 'Create',
            page: OtherFilesPages.Create
        }
    },
    {
        path: ':id',
        component: PreviewComponent,
        resolve: {
            otherFile: OtherFileResolver
        }
    },
    {
        path: ':id/edit',
        component: CreateComponent,
        data: {
            breadcrumb: 'Edit',
            page: OtherFilesPages.Edit
        },
        resolve: {
            otherFile: OtherFileResolver,
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class OtherFilesViewsRoutingModule {
}
