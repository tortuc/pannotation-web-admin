import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ResponseErrorInterceptor } from './response-error.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseErrorInterceptor,
            multi: true
        },
    ]
})
export class ResponseErrorModule {
}
