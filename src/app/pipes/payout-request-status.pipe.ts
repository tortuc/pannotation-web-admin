import { Pipe, PipeTransform } from '@angular/core';

import { statuses } from '../models/payout-request/payout-request-statuses';

@Pipe({ name: 'payoutRequestStatus', pure: false })
export class PayoutRequestStatusPipe implements PipeTransform {
    transform(id: number): string {
        return statuses.find((status) => status.id === id).name;
    }
}
