import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SubscriptionsListComponent } from './list/list.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionsRoute } from './subscriptions-routing.module';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { SubscriptionResolver } from 'src/app/resolvers/subscription.resolver';
import { PaginationModule, PaginationConfig, BsModalService } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/components/directives/directives.module';
import { PipeModule } from 'src/app/pipes/pipes.module';
import { ViewContainerModule } from 'src/app/libs/view-container/view-container.module';
import { CommonComponentsModule } from 'src/app/components/common/common-components.module';
import { BreadcrumbModule } from 'angular-crumbs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersHelper } from '../users/users-helper';
import { UsersService } from 'src/app/services/users.service';

@NgModule({
    declarations: [
        SubscriptionsListComponent,
        SubscriptionComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        PaginationModule,
        FormsModule,
        DirectivesModule,
        PipeModule,
        CommonComponentsModule,
        NgbModule,
        RouterModule.forChild(SubscriptionsRoute),
        BreadcrumbModule,
        ViewContainerModule,
    ],
    providers: [
        SubscriptionsService,
        SubscriptionResolver,
        PaginationConfig,
        BsModalService,
        UsersService,
        UsersHelper
    ]
})
export class SubscriptionsModule {
}
