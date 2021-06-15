import { User } from './user';
import { Image } from '../image';
import { UserRole } from './user-roles';

export class UserModel implements User {
    readonly id: number;
    readonly email: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly address?: string;
    readonly country?: string;
    readonly city?: string;
    isBlocked?: boolean;
    readonly avatar?: Image;
    readonly isSubscribed?: boolean;
    readonly shouldCancelSubscription?: boolean;
    readonly mobileNumber?: string;
    readonly phoneNumber?: string;
    readonly state?: string;
    readonly idCode?: string;
    readonly zip?: string; 

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.address = user.address;
        this.country = user.country;
        this.city = user.city;
        this.isBlocked = user.isBlocked;
        this.avatar = user.avatar;
        this.isSubscribed = user.isSubscribed;
        this.shouldCancelSubscription = user.shouldCancelSubscription;
        this.mobileNumber = user.mobileNumber;
        this.phoneNumber = user.phoneNumber;
        this.state = user.state;
        this.idCode = user.idCode;
        this.zip = user.zip;
    }
}
