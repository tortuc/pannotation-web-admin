import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

import { FormComponent } from './form/form.component';
import { SignInRouter } from './sign-in.router';
import { AuthService } from '../../services/auth.service';
import { ViewContainerModule } from '../../libs/view-container/view-container.module';
import { maxlengthValidationMessage,
    maxValidationMessage,
    minlengthValidationMessage,
    minValidationMessage,
    emailValidationMessage
} from '../../core/validation/rules';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
                { name: 'minlength', message: minlengthValidationMessage },
                { name: 'maxlength', message: maxlengthValidationMessage },
                { name: 'min', message: minValidationMessage },
                { name: 'max', message: maxValidationMessage },
                { name: 'email', message: emailValidationMessage }
            ]
        }),
        FormlyBootstrapModule,
        RouterModule.forChild(SignInRouter),

        ViewContainerModule
    ],
    providers: [AuthService],
    declarations: [FormComponent]
})
export class SignInModule {
}
