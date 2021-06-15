import { Image } from '../image/image';
import { UserRole } from './user-roles';

export interface User {
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
    shouldCancelSubscription?: boolean;
    readonly mobileNumber?: string;
    readonly phoneNumber?: string;
    readonly state?: string;
    readonly idCode?: string;
    readonly zip?: string; 
}
