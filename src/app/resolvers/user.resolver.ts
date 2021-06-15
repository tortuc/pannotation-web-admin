import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user/user-model';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserResolver implements Resolve<UserModel> {
    constructor(private readonly usersService: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> {
        const userId = route.params.id;

        return this.usersService.getOne(userId);
    }
}
