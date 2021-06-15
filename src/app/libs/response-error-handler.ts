import { HttpErrorResponse } from '@angular/common/http';

import { ServerError } from '../models/response/server-error';

export function responseErrorHandler(err: HttpErrorResponse): string {
    const error: ServerError = err.error;
    return error.errors[0].message || 'Unknown error';
}
