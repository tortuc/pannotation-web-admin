export interface Order {
    readonly id: number;
    readonly buyerId: number;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly date?: string;
    readonly amount?: number;
    readonly songsheets?: string[];
}
