import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { SessionStorage } from '../../core/session/session-storage';
import { User } from '../../models/user/user';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
    user: User;

    constructor(private readonly sessionStorage: SessionStorage) {
    }

    ngOnInit() {
        this.user = this.sessionStorage.restore();
    }
}
