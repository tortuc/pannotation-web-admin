export function getFields () {
    return [
        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Current password',
                placeholder: 'Please enter current password',
                required: true,
                minLength: 6,
                maxLength: 50,
                pattern: /^(\s*)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()?/|]?)(?=.\S)(?=.*\d).+$/
            },
            validation: {
                messages: {
                    pattern: 'Password should contain at least one letter, one digit and one capital letter',
                    minlength: 'Password must be from 6 to 50 symbols',
                    maxlength: 'Password must be from 6 to 50 symbols',
                }
            }
        },
        {
            key: 'newPassword',
            validators: {
                fieldMatch: {
                    expression: (control) => {
                    const value = control.value;

                    return value.confirmPassword === value.newPassword
                    // avoid displaying the message error when values are empty
                    || (!value.confirmPassword || !value.newPassword);
                },
                message: 'Passwords don\'t match',
                errorPath: 'confirmPassword',
                },
            },
            fieldGroup: [
                {
                    key: 'newPassword',
                    type: 'input',
                    templateOptions: {
                        type: 'password',
                        label: 'New password',
                        placeholder: 'Please enter new password',
                        required: true,
                        minLength: 6,
                        maxLength: 50,
                        pattern: /^(\s*)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()?/|]?)(?=.\S)(?=.*\d).+$/
                    },
                    validation: {
                        messages: {
                            pattern: 'Password should contain at least one letter, one digit and one capital letter',
                            minlength: 'Password must be from 6 to 50 symbols',
                            maxlength: 'Password must be from 6 to 50 symbols',
                        }
                    }
                },
                {
                    key: 'confirmPassword',
                    type: 'input',
                    templateOptions: {
                        type: 'password',
                        label: 'Confirm Password',
                        placeholder: 'Please re-enter new password',
                        required: true,
                    },
                },
            ],
        },
    ];
}

export function getModel () {
    return {
        password: '',
        newPassword: {
            newPassword: '',
            confirmPassword: ''
        },
    };
}
