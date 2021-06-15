import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { EMPTY, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators';

import { User } from '../../models/user/user';
import { UsersService } from '../../services/users.service';
import { ConfirmationDialogComponent } from '../../components/modals/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class UsersHelper {

    constructor(private readonly modalService: BsModalService,
                private readonly usersService: UsersService) {
    }

    deleteUser(user: User) {
        let message = 'Are you sure?';

        const modalRef = this.modalService.show(ConfirmationDialogComponent, {
            initialState: {
                data: {
                    title: 'Delete users account',
                    message
                }
            }
        });

        return modalRef.content.result
            .pipe(switchMap(result => {
                if (result) {
                    return this.usersService.deleteUser(user);
                }
                return EMPTY;
            }));
    }

    changeState(user: User) {
        const modalRef = this.modalService.show(ConfirmationDialogComponent, {
            initialState: {
                data: {
                    title: user.isBlocked ? 'Unblock users account' : 'Block users account',
                    message: 'Are you sure?'
                }
            }
        });

        return modalRef.content.result
            .pipe(switchMap(result => {
                if (result) {
                    return this.usersService.changeState(user);
                }
                return EMPTY;
            }));
    }

    unsubscribeUser() {
        const modalRef = this.modalService.show(ConfirmationDialogComponent, {
            initialState: {
                data: {
                    title: 'Unsubscribe user',
                    message: 'Are you sure?'
                }
            }
        });

        return modalRef.content.result
            .pipe(switchMap(result => {
                if (result) {
                    return of(true);
                }
                return of(false);
            }));
    }
}
