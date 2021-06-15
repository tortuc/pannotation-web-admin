import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BsModalService, PaginationConfig, PaginationModule } from 'ngx-bootstrap';

import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { PayoutRequestsRoutes } from './payout-requests-routing.module';
import { PayoutRequestsListComponent } from './list/list.component';
import { WithdrawRequestService } from '../../services/withdraw-requests.service';
import { PipeModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../components/directives/directives.module';
import { CommonComponentsModule } from '../../components/common/common-components.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        PaginationModule,
        FormsModule,
        DirectivesModule,
        PipeModule,
        RouterModule.forChild(PayoutRequestsRoutes),
        ViewContainerModule,
        CommonComponentsModule
    ],
    providers: [
        WithdrawRequestService,
        PaginationConfig,
        BsModalService
    ],
    declarations: [
        PayoutRequestsListComponent
    ],
})

export class PayoutRequestsModule {
}
