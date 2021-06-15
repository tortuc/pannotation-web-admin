import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, shareReplay } from 'rxjs/internal/operators';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { CommonFilter, CommonUrlFilter, Table } from '../../../libs/tables';
import { User } from '../../../models/user/user';
import { UsersService } from '../../../services/users.service';
import { UsersHelper } from '../users-helper';
import { PAGE_SIZE } from '../../app.constants';

const minSearchLength = 3;

@Component({
    selector: 'app-users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
    searchControl = new FormControl(this.activatedRoute.snapshot.queryParams.q);
    usersTable: Table<User, CommonFilter>;
    urlFilter: CommonUrlFilter<CommonFilter>;
    pageIndex: number;
    filterChanges: Observable<CommonFilter>;
    usersList: Observable<User[]>;
    limit = PAGE_SIZE;
    offset = 0;
    currentOffset = 0;
    q: string;

    private readonly subscription = new Subscription();

    constructor(private readonly activatedRoute: ActivatedRoute,
                private readonly router: Router,
                private readonly cdr: ChangeDetectorRef,
                private readonly usersService: UsersService,
                private readonly usersHelper: UsersHelper) {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.usersTable.disconnect();
    }

    ngOnInit(): void {
        this.filterChanges = this.activatedRoute
            .queryParamMap
            .pipe(
                map((paramMap) => {
                    const offset = paramMap.has('offset') ? parseInt(paramMap.get('offset'), 10) : this.offset;
                    const limit = paramMap.has('limit') ? parseInt(paramMap.get('limit'), 10) : this.limit;
                    this.currentOffset = offset;
                    this.pageIndex = offset / limit + 1;
                    this.q = paramMap.get('q') ? paramMap.get('q') : '';
                    return {
                        offset,
                        limit,
                        orderBy: paramMap.get('orderBy') ? paramMap.get('orderBy') : 'Id',
                        orderType: paramMap.get('orderType') ? paramMap.get('orderType') : 'desc',
                        q: this.q,
                    } as CommonFilter;
                }),
                shareReplay()
            );

        this.urlFilter = new CommonUrlFilter<CommonFilter>(this.router);

        this.usersTable = new Table(this.usersService, this.filterChanges);

        const searchSub = this.searchControl.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(300)
            )
            .subscribe((val) => {
                if (val.length === 0 || val.length >= minSearchLength) {
                    this.q = val;
                    this.urlFilter.setKeys({
                        q: val,
                        offset: 0,
                        limit: this.limit,
                    }, false);
                }

                let q = this.activatedRoute.snapshot.queryParams.q;
                if(q && q.length >= minSearchLength && val.length < minSearchLength)
                {
                    this.urlFilter.setKeys({
                        q: "",
                        offset: 0,
                        limit: this.limit,
                    }, false);
                }
            });
        this.subscription.add(searchSub);

        this.usersList = this.usersTable.connect();     
    }

    changeState(user: User) {
        this.usersHelper.changeState(user)
            .subscribe(() => {
                user.isBlocked = !user.isBlocked;
                this.cdr.detectChanges();
            });
    }

    deleteUser(user: User) {
        this.usersHelper.deleteUser(user)
            .subscribe(() => {
                this.usersTable.refresh();
                this.cdr.detectChanges();
            });
    }
}
