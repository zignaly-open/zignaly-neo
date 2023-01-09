import BigNumber from 'bignumber.js';

export const sortBigNumbers = (
  a: string | BigNumber,
  b: string | BigNumber,
) => {
  a = new BigNumber(a);
  b = new BigNumber(b);
  if (a.isGreaterThan(b)) return 1;
  if (a.isLessThan(b)) return -1;
  return 0;
};

/**
 * Get number of decimals from a precision number
 * @param integerMultiple Precision number (e.g. 0.00000001)
 * @returns Number of decimals.
 */
export const precisionNumberToDecimals = (integerMultiple: string) => {
  // https://www.reddit.com/r/BinanceExchange/comments/995jra/getting_atomic_withdraw_unit_from_api/e4mi63w/
  const integerMultipleFloat = parseFloat(integerMultiple);
  return integerMultipleFloat > 1
    ? 0
    : Math.abs(Math.log10(integerMultipleFloat));
};

export const stringSort = (a: string, b: string) => a.localeCompare(b);

export const getColorForNumber = (
  value: number | string,
): undefined | 'redGraphOrError' | 'greenGraph' =>
  +value === 0 ? undefined : +value > 0 ? 'greenGraph' : 'redGraphOrError';
