import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BsModalService, PaginationConfig, PaginationModule } from 'ngx-bootstrap';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { OrdersListComponent } from './list/list.component';
import { PipeModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../components/directives/directives.module';
import { CommonComponentsModule } from '../../components/common/common-components.module';
import { BreadcrumbModule } from 'angular-crumbs';
import { OrdersRoute } from './orders-routing.module';
import { OrderResolver } from '../../resolvers/order.resolver';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderComponent } from './order/order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        PaginationModule,
        FormsModule,
        DirectivesModule,
        PipeModule,
        RouterModule.forChild(OrdersRoute),
        ViewContainerModule,
        CommonComponentsModule,
        BreadcrumbModule,
        NgbModule
    ],
    providers: [
        OrdersService,
        PaginationConfig,
        BsModalService,
        OrderResolver
    ],
    declarations: [
        OrdersListComponent,
        OrderComponent
    ],
})

export class OrderModule {
}
