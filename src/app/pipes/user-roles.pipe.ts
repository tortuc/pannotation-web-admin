import { Pipe, PipeTransform } from '@angular/core';

import { UserRole } from '../models/user/user-roles';

const roles = {
    [UserRole.Customer]: 'Customer',
    [UserRole.Provider]: 'Provider'
};

@Pipe({ name: 'userRole', pure: false })
export class UserRolesPipe implements PipeTransform {
    transform(role: UserRole): string {
        return roles[role];
    }
}
