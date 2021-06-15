import { NgModule } from '@angular/core';

import { API_URL } from 'src/environments/environment';
import { RemoteModule, API_URL_TOKEN } from '../libs/remote';
import { ApiUrlMatcher } from './api-url-matcher';
import { SessionStorage } from './session/session-storage';
import { RefreshSessionService } from './session/session-refresh';
import {
    AuthenticatedModule,
    SHOULD_AUTHENTICATE,
    PROVIDE_ACCESS_TOKEN,
    PROVIDE_REFRESH_TOKEN,
    AUTHENTICATED_SESSION_STORAGE,
    SESSION_REFRESHER
} from '../libs/authenticated';
import { ResponseErrorModule } from '../libs/remote/response-error.module';

@NgModule({
    imports: [
        ResponseErrorModule,
        AuthenticatedModule,
        RemoteModule
    ],
    providers: [
        {
            provide: SHOULD_AUTHENTICATE,
            useClass: ApiUrlMatcher
        },
        {
            provide: API_URL_TOKEN,
            useValue: API_URL
        },
        {
            provide: PROVIDE_ACCESS_TOKEN,
            useExisting: SessionStorage
        },
        {
            provide: PROVIDE_REFRESH_TOKEN,
            useExisting: SessionStorage
        },
        {
            provide: AUTHENTICATED_SESSION_STORAGE,
            useExisting: SessionStorage
        },
        {
            provide: SESSION_REFRESHER,
            useExisting: RefreshSessionService
        },
        SessionStorage,
        RefreshSessionService
    ]
})
export class CoreModule {

}
