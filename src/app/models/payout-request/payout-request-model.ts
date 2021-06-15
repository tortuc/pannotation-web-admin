import { PayoutRequest } from './payout-request';
import { UserModel } from '../user/user-model';

export class PayoutRequestModel implements PayoutRequest {
    readonly id: number;
    readonly userId: number;
    readonly amount: number;
    readonly status: number;
    readonly provider: UserModel;
    readonly createdAt: string;
    readonly updatedAt: string;

    constructor (sonsheet: PayoutRequest) {
        this.id = sonsheet.id;
        this.userId = sonsheet.userId;
        this.amount = sonsheet.amount;
        this.status = sonsheet.status;
        this.provider = sonsheet.provider;
        this.createdAt = sonsheet.createdAt;
        this.updatedAt = sonsheet.updatedAt;
    }
}
