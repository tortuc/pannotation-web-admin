import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'angular-crumbs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';

import { OtherFilesListComponent } from './other-files-list/other-files-list.component';
import { OtherFilesRoutingModule } from './other-files-routing.module';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { PipeModule } from '../../pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { CommonComponentsModule } from 'src/app/components/common/common-components.module';

@NgModule({
    declarations: [OtherFilesListComponent],
    imports: [
        CommonModule,
        CommonComponentsModule,
        OtherFilesRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        BreadcrumbModule,
        ReactiveFormsModule,
        PaginationModule,
        FormsModule,
        PipeModule,
        ViewContainerModule,
        TagInputModule,
        NgSelectModule
    ]
})
export class OtherFilesModule {
}
