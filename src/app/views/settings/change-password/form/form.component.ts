import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

import { getFields, getModel } from './form.configs';
import { FormModel } from './form.model';
import { AdminService } from '../../../../services/admin.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
    form: FormGroup;
    model: FormModel;
    fields: FormlyFieldConfig[];

    constructor(private readonly adminService: AdminService,
                private readonly notificationService: NotificationService,
                private readonly router: Router) {
        this.initForm();
    }

    submit(data: FormModel): void {
        this.adminService
            .changePassword({
                password: data.password,
                newPassword: data.newPassword.newPassword
            })
            .subscribe(() => {
                this.notificationService.open('Your password updated successfully');
                this.router.navigate(['/']);
            });
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields();
    }
}
