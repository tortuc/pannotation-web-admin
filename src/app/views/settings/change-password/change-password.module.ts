import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

import { FormComponent } from './form/form.component';
import { ChangePasswordRouter } from './change-password.router';
import { AdminService } from '../../../services/admin.service';
import { ViewContainerModule } from 'src/app/libs/view-container/view-container.module';
import { AuthGuard } from '../../../guards/auth-guard';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
        FormlyBootstrapModule,
        RouterModule.forChild(ChangePasswordRouter),

        ViewContainerModule
    ],
    providers: [
        AdminService,
        AuthGuard
    ],
    declarations: [FormComponent]
})
export class ChangePasswordModule {
}
