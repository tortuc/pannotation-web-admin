export interface SubscriptionItem {
    readonly id: number;
    readonly userId: number;
    readonly email: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly purchaseDate?: string;
    readonly nextPaymentDate?: string;
    readonly country?: string;
}
