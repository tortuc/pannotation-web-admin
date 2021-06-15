import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user/user';

declare var jQuery: any;

interface NavigationLink {
    label: string;
    activeLink: string;
    icon: string;
    route: string[];
}

const fullNamePlaceholder = 'Admin';
const avatarPlaceholder = '/assets/img/avatar-placeholder.jpg';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationComponent implements AfterViewInit {
    @Input() user: User;

    readonly navigationList: NavigationLink[] = [
        {
            label: 'Users',
            activeLink: 'users',
            icon: 'user',
            route: ['/users']
        },
        {
            label: 'Orders',
            activeLink: 'orders',
            icon: 'usd',
            route: ['/orders']
        },
        {
            label: 'Music Scores',
            activeLink: 'music-scores',
            icon: 'list',
            route: ['/music-scores']
        },
        {
            label: 'Other files',
            activeLink: 'other-files',
            icon: 'list-alt',
            route: ['/other-files']
        },
        {
            label: 'Subscriptions',
            activeLink: 'subscriptions',
            icon: 'envelope',
            route: ['/subscriptions']
        },
    ];

    constructor(private readonly router: Router) {
    }

    get fullName(): string {
        if (!this.user) {
            return fullNamePlaceholder;
        }
        const { firstName, lastName } = this.user;
        return firstName || lastName ? [firstName, lastName].join(' ') : fullNamePlaceholder;
    }

    get avatar(): string {
        if (!this.user || !this.user.avatar) {
            return avatarPlaceholder;
        }

        const { avatar } = this.user;

        if (avatar.compactPath) {
            return avatar.compactPath;
        }

        return avatar.originalPath || avatarPlaceholder;
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean {
        return this.router.url.indexOf(routename) > -1;
    }
}
