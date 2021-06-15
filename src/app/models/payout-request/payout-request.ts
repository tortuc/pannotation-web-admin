import { UserModel } from '../user/user-model';

export interface PayoutRequest {
    readonly id: number;
    readonly userId: number;
    readonly amount: number;
    readonly status: number;
    readonly provider: UserModel;
    readonly createdAt: string;
    readonly updatedAt: string;
}
