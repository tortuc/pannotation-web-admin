import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { RemoteUrlInterceptor } from './remote-url.interceptor';

/**
 * This module provides an interceptor that adds API_URL to every
 * request which url doesn't match pattern: ^https?:\/\//
 *
 * For using this interceptor you need to import module and provide API_URL:
 * ```
 * {
 *     provide: API_URL_TOKEN,
 *     useValue: "https://api.myproject.dev.cleveroad.com/api/v1"
 * }
 * ```
 */
@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RemoteUrlInterceptor,
            multi: true
        },

    ]
})
export class RemoteModule {

}
