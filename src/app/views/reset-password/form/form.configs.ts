export function getFields () {
    return [
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email',
                placeholder: 'Workemail@gmail.com',
                minLength: 1,
                maxLength: 129,
                required: true,
            },
            validators: {
                validation: ['email']
            },
            validation: {
                messages: {
                        minlength: 'Email address is not in valid format',
                        maxlength: 'Email address is not in valid format',
                        email: 'Email address is not in valid format',
                }
            },
        },
    ];
}

export function getModel () {
    return {
        email: '',
    };
}
