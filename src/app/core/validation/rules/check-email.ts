import { FormControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

//tslint:disable
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function checkEmail(control: FormControl): ValidationErrors {
    return emailRegExp.test(control.value) ? null : { email: true };
}

export function emailValidationMessage(err: boolean, field: FormlyFieldConfig): string {
    return 'Email is not in valid format';
}
