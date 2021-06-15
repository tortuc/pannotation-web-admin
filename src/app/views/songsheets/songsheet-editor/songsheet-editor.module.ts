import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SongsheetEditorRouter } from './songsheet-editor.router';
import { ViewContainerModule } from 'src/app/libs/view-container/view-container.module';
import { SongsheetEditorComponent } from './songsheet-editor.component';
import { SongsheetsService } from 'src/app/services/songsheets.service';
import { UploadService } from 'src/app/services/uploads.service';
import { SongsheetResolver } from 'src/app/resolvers/songsheet.resolver';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ]
        }),
        FormlyBootstrapModule,
        RouterModule.forChild(SongsheetEditorRouter),
        ViewContainerModule,
        TagInputModule,
        FormsModule
    ],
    providers: [SongsheetsService, UploadService, SongsheetResolver],
    declarations: [SongsheetEditorComponent]
})

export class SongsheetEditorModule {
}
