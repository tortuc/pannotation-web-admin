import { PayoutRequestOption } from './payout-request-option';

export enum statusesValues {
    pending = 1,
    accepted = 2,
    declined = 3
}

export const statuses: PayoutRequestOption[] = [
    {name: 'Pending', id: statusesValues.pending},
    {name: 'Accepted', id: statusesValues.accepted},
    {name: 'Declined', id: statusesValues.declined}
];
