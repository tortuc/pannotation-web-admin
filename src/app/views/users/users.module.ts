import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BsDropdownModule, BsModalService, PaginationConfig, PaginationModule } from 'ngx-bootstrap';

import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { UsersRoutes } from './users-routing.module';
import { UsersListComponent } from './list/list.component';
import { UsersService } from '../../services/users.service';
import { PipeModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../components/directives/directives.module';
import { UserComponent } from './user/user.component';
import { UserResolver } from '../../resolvers/user.resolver';
import { CommonComponentsModule } from '../../components/common/common-components.module';
import { UsersHelper } from './users-helper';
import { BreadcrumbModule } from 'angular-crumbs';
import { UploadService } from 'src/app/services/uploads.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        PaginationModule,
        FormsModule,
        PipeModule,
        DirectivesModule,
        BsDropdownModule,
        RouterModule.forChild(UsersRoutes),
        ViewContainerModule,
        CommonComponentsModule,
        BreadcrumbModule
    ],
    providers: [
        UsersService,
        PaginationConfig,
        BsModalService,
        UserResolver,
        UsersHelper,
        UploadService,
        SubscriptionsService
    ],
    declarations: [
        UsersListComponent,
        UserComponent,
    ]
})

export class UsersModule {
}
