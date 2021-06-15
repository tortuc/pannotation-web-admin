export interface FormModel {
    readonly  password: string;
    readonly newPassword: {
        newPassword: string;
        confirmPassword: string;
    };
}
