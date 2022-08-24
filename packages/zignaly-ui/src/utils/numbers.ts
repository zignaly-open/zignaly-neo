// Dependencies
import BigNumber from "bignumber.js";
export const isPositive = (number: number) => 1 / (number * 0) === 1 / 0;

export const formatBalanceUnits = (value: any) => {
  const number = String(value);

  const decimals = number.split(".")[1] ?? null;

  if (!decimals) {
    return value;
  }

  const hasZero = parseInt(decimals.substring(0, 4)) === 0;
  return parseFloat(value).toFixed(hasZero ? 2 : 4);
};

/**
 * @description THIS FUNCTION ONLY TEST use in real cases customSort
 *
 * @param propParamNameForValue Prop from which to take the value to order
 * @param useProp if you do not use prop you sort by value
 *
 * @returns {Number} returns the number for sorting
 */
export const sortByPointDecimal =
  ({
    propParamNameForValue = "value",
    useProp = true,
  }: { propParamNameForValue?: string; useProp?: boolean } = {}) =>
  (rowA: any, rowB: any, columnId: string): number => {
    const a = parseFloat(
      useProp ? rowA.values[columnId].props[propParamNameForValue] : rowA.values[columnId],
    );
    const b = parseFloat(
      useProp ? rowB.values[columnId].props[propParamNameForValue] : rowB.values[columnId],
    );
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

/**
 * @description Sort the column by picking up the value
 *
 * @returns {Number} returns the number for sorting
 * @param a value to compare
 * @param b value to compare
 * @param isNecessaryParseFloat if is necessary parse
 */
export const customSort = (
  a: string | number,
  b: string | number,
  isNecessaryParseFloat = false,
) => {
  /* eslint-disable no-param-reassign */
  if (isNecessaryParseFloat) {
    if (typeof a === "string") {
      a = parseFloat(a);
    }
    if (typeof b === "string") {
      b = parseFloat(b);
    }
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

/**
 * @description Sort the column by picking up the value
 *
 * @returns {Number} returns the number for sorting
 * @param a value to compare
 * @param b value to compare
 */
export const customSortBigNumbers = (a: string | BigNumber, b: string | BigNumber) => {
  a = new BigNumber(a);
  b = new BigNumber(b);
  if (a.isGreaterThan(b)) return 1;
  if (a.isLessThan(b)) return -1;
  return 0;
};
