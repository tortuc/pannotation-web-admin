export interface Transaction {
    readonly cardMask: string;
    readonly cardType: string;
    readonly paymentProcessor: string;
    readonly expirationDate: string;
    readonly transactionStatus: string;
}