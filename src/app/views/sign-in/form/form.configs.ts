import { FormlyFieldConfig } from '@ngx-formly/core';
import { checkEmail } from 'src/app/core/validation/rules';

export function getFields(): FormlyFieldConfig[] {
    return [
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email',
                placeholder: 'Workemail@gmail.com',
                required: true
            },
            validators: {
                validation: [checkEmail]
            }
        },
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Password',
                placeholder: 'Enter password',
                required: true
            },
        },
    ];
}

export function getModel() {
    return {
        email: '',
        password: ''
    };
}
