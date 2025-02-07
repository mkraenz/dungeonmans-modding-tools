export type NonZeroDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Digit = 0 | NonZeroDigit;
export type DoubleDigit = Exclude<`${'0' | '1'}${Digit}`, '00'>;
