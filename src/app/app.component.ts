import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';

import { SessionStorage } from './core/session/session-storage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    readonly toasterConfig: ToasterConfig;

    constructor(private readonly router: Router,
        private readonly sessionStorage: SessionStorage) {
        // set default toastr config
        this.toasterConfig = new ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 2000,
            preventDuplicates: true
        });
    }

    ngOnInit(): void {
        const currentUser = this.sessionStorage.restore();

        if (currentUser) {
            this.sessionStorage.store(currentUser);
        } else {
            // navigate to sign in page in case user is not authenticated
            this.router.navigate(['/sign-in']);
        }
    }
}
