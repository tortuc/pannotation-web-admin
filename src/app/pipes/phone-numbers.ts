import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    constructor() { }
    transform(phone) {
        try {
            const phoneNumber = parsePhoneNumberFromString(phone)
            return phoneNumber.formatInternational();
        } catch {
            return 'N/A';
        }
    };
} 