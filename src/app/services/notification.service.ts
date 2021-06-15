import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

import { NotificationLevels } from '../models/notifications/notifications-levels';

@Injectable()
export class NotificationService {

    constructor(private readonly toasterService: ToasterService) {
    }

    open(message: string, level = 'success') {
        this.toasterService.pop(NotificationLevels[level], level, message);
    }
}
