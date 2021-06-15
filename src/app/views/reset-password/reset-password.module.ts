import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

import { ResetPasswordComponent } from './form/form.component';
import { ResetPasswordRouter } from './reset-password.router';
import { VerificationsService } from '../../services/verifications.service';
import { ViewContainerModule } from 'src/app/libs/view-container/view-container.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
            validators: [
                { name: 'email', validation: Validators.email },
            ]
        }),
        FormlyBootstrapModule,
        RouterModule.forChild(ResetPasswordRouter),

        ViewContainerModule
    ],
    providers: [VerificationsService],
    declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule {
}
