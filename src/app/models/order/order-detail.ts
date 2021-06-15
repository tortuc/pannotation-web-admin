import { SongsheetPurchased } from '../songsheet/songsheet-purchased';
import { Transaction } from '../transaction/transaction';

export interface OrderDetails {
    readonly id: number;    
    readonly date: string;
    readonly email: string;
    readonly mobileNumber: string;
    readonly phoneNumber: string;
    readonly amount: number;
    readonly songsheets: SongsheetPurchased[];    
    readonly transactionInfo: Transaction;    
}
