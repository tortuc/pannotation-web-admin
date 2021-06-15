import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service';
import { responseErrorHandler } from '../response-error-handler';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
    constructor(private readonly notificationService: NotificationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(catchError((err: HttpErrorResponse) => {
            this.notificationService.open(responseErrorHandler(err), 'error');
            return throwError(err);
        }));
    }
}
