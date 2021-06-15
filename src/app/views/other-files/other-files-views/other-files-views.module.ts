import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';

import { OtherFilesViewsRoutingModule } from './other-files-views-routing.module';
import { CreateComponent } from './create/create.component';
import { PipeModule } from '../../../pipes/pipes.module';
import { ViewContainerModule } from '../../../libs/view-container/view-container.module';
import { UploadService } from '../../../services/uploads.service';
import { MarkdownEditorModule } from '../../../components/common/markdown-editor/markdown-editor.module';
import { OtherFilesService } from '../../../services/other-files.service';
import { PreviewComponent } from './preview/preview.component';
import { OtherFileResolver } from '../../../resolvers/other-file.resolver';
import { MarkedDirectiveModule } from '../../../core/directives/marked/marked-directive.module';
import { MarkedService } from '../../../services/marked.service';

@NgModule({
    declarations: [CreateComponent, PreviewComponent],
    imports: [
        CommonModule,
        OtherFilesViewsRoutingModule,
        RouterModule,
        BreadcrumbModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        TagInputModule,
        ViewContainerModule,
        NgSelectModule,
        MarkdownEditorModule,
        MarkedDirectiveModule
    ],
    providers: [
        UploadService,
        OtherFilesService,
        OtherFileResolver,
        MarkedService
    ]
})
export class OtherFilesViewsModule {
}
