import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { SettingsComponent } from './settings.component';
import { SettingsRoutes } from './settings-routing.module';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapModule,
        RouterModule.forChild(SettingsRoutes),
        ViewContainerModule
    ],
    providers: [],
    declarations: [SettingsComponent]
})

export class SettingsModule {
}
