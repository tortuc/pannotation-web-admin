import { OrderDetails } from './order-detail';
import { SongsheetPurchased } from '../songsheet/songsheet-purchased';
import { Transaction } from '../transaction/transaction';

export class OrderDetailsModel implements OrderDetails {
    readonly id: number;    
    readonly date: string;
    readonly email: string;
    readonly mobileNumber: string;
    readonly phoneNumber: string;
    readonly amount: number;
    readonly songsheets: SongsheetPurchased[];    
    readonly transactionInfo: Transaction;    

    constructor (order: OrderDetails) {
        this.id = order.id;
        this.email = order.email;
        this.date = order.date;
        this.email = order.email;
        this.mobileNumber = order.mobileNumber;
        this.phoneNumber = order.phoneNumber;
        this.amount = order.amount;
        this.songsheets = order.songsheets;    
        this.transactionInfo = order.transactionInfo;
    }
}
