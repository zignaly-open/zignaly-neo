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

export const stringSort = (a: string, b: string) => a.localeCompare(b);
