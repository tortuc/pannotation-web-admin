import { KeyValuePair } from './key-value-pair';

export class KeyValuePairModel<T, P> implements KeyValuePair<T, P> {
    readonly key: T;
    readonly value: P;

    constructor (key: T, value: P) {
        this.key = key;
        this.value = value;
    }
}
