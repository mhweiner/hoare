import {multiply} from './multiply';

export function exponent(base: number, exp: number): number {

    if (exp < 0) throw new Error('exponent must be >= 0');

    switch (exp) {

        case 0:
            return 1;
        case 1:
            return base;
        default:
            return multiply(base, exponent(base, exp - 1));

    }

}
