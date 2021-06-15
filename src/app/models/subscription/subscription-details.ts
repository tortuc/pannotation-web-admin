import { Transaction } from '../transaction/transaction';

export class SubscriptionDetails {
    readonly id: number;
    readonly userId: number;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly purchaseDate: string;
    readonly nextPaymentDate: string;
    readonly country: string;
    readonly phoneNumber: string;
    readonly mobileNumber: string;
    readonly idCode: string;

    readonly transactionInfo: Transaction;
}
