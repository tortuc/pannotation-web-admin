import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';

import { getFields, getModel } from './form.configs';
import { FormModel } from './form.model';
import { VerificationsService } from '../../../services/verifications.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
    form: FormGroup;
    model: FormModel;
    fields: FormlyFieldConfig[];
    isSuccessful = new BehaviorSubject<boolean>(false);

    constructor(private readonly verificationsService: VerificationsService) {
        this.initForm();
    }

    submit(data: FormModel): void {
        this.verificationsService.reset(data.email)
            .subscribe(() => this.isSuccessful.next(true));
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields();
    }
}
