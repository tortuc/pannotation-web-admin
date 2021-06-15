import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BsModalService, PaginationConfig, PaginationModule } from 'ngx-bootstrap';

import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { SongsheetsTableComponent } from './songsheets-table/songsheets-table.component';
import { SongsheetsService } from '../../services/songsheets.service';
import { UploadService } from '../../services/uploads.service';
import { PipeModule } from '../../pipes/pipes.module';
import { SongsheetResolver } from '../../resolvers/songsheet.resolver';
import { DirectivesModule } from '../directives/directives.module';
import { SecureImageUrlPipe } from 'src/app/pipes/secure-image-url';
import { ToggleComponent } from './toggle/toggle.component';
import { OtherFilesTableComponent } from './other-files-table.component/other-files-table.component';
import { OtherFilesService } from 'src/app/services/other-files.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        PaginationModule,
        FormsModule,
        PipeModule,
        RouterModule,
        ViewContainerModule,
        DirectivesModule        
    ],
    providers: [
        SongsheetsService,
        UploadService,
        PaginationConfig,
        BsModalService,
        SongsheetResolver,
        OtherFilesService
    ],
    declarations: [
        SongsheetsTableComponent,
        ToggleComponent,
        OtherFilesTableComponent
    ],
    exports: [
        SongsheetsTableComponent,
        ToggleComponent,
        OtherFilesTableComponent
    ],
    entryComponents: [
        SongsheetsTableComponent
    ]
})

export class CommonComponentsModule {
}
