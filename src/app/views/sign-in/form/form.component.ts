import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { getFields, getModel } from './form.configs';
import { FormModel } from './form.model';
import { AuthService } from '../../../services/auth.service';
import { SessionStorage } from '../../../core/session/session-storage';
import { AppUser } from '../../../core/session/app-user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserModel } from '../../../models/user/user-model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
    form: FormGroup;
    model: FormModel;
    fields: FormlyFieldConfig[];
    isSuccessful = new BehaviorSubject<boolean>(true);

    constructor(private readonly authService: AuthService,
                private readonly sessionStorage: SessionStorage,
                private readonly notificationService: NotificationService,
                private readonly router: Router) {
        this.initForm();
    }

    submit(data: FormModel): void {
        this.authService.signIn(data)
            .pipe(
                switchMap((response: AppUser) => {
                    this.sessionStorage.store(response);
                    return this.authService.getProfile();
                })
            )
            .subscribe(
                (response: UserModel) => {
                    const userData = this.sessionStorage.restore();
                    this.sessionStorage.store({ ...userData, ...response });
                    this.router.navigate(['/users']);
                },
                (error: string) => {
                    if (error) {
                        this.isSuccessful.next(false);
                    }
                }
            );
    }

    private initForm(): void {
        this.form = new FormGroup({});
        this.model = getModel();
        this.fields = getFields();
    }
}
