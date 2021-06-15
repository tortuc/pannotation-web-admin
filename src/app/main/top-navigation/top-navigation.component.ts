import { ChangeDetectionStrategy, Component } from '@angular/core';

import { smoothlyMenu } from '../main/main.helper';

declare var jQuery: any;

@Component({
    selector: 'app-top-navigation',
    templateUrl: './top-navigation.component.html',
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavigationComponent {

    toggleNavigation(): void {
        jQuery('body').toggleClass('mini-navbar');
        smoothlyMenu();
    }
}
