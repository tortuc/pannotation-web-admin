import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BsModalService, PaginationConfig, PaginationModule } from 'ngx-bootstrap';

import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { SongsheetsRoute } from './songsheets-routing.module';
import { SongsheetsListComponent } from './list/list.component';
import { SongsheetsService } from '../../services/songsheets.service';
import { PipeModule } from '../../pipes/pipes.module';
import { SongsheetResolver } from '../../resolvers/songsheet.resolver';
import { SongsheetComponent } from './songsheet/songsheet.component';
import { DirectivesModule } from '../../components/directives/directives.module';
import { CommonComponentsModule } from '../../components/common/common-components.module';
import { BreadcrumbModule } from 'angular-crumbs';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        PaginationModule,
        FormsModule,
        DirectivesModule,
        PipeModule,
        RouterModule.forChild(SongsheetsRoute),
        ViewContainerModule,
        CommonComponentsModule,
        BreadcrumbModule
    ],
    providers: [
        SongsheetsService,
        PaginationConfig,
        BsModalService,
        SongsheetResolver
    ],
    declarations: [
        SongsheetsListComponent,
        SongsheetComponent
    ],
})

export class SongsheetModule {
}
