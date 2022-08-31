// Dependencies
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
 * @description THIS FUNCTION ONLY TEST use in real cases sortByValue
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
 * @param firstNumber value to compare
 * @param secondNumber value to compare
 * @param isNecessaryParseFloat if is necessary parse
 */
export const sortByValue = (
  firstNumber: string | number,
  secondNumber: string | number,
  isNecessaryParseFloat = false,
) => {
  let number1 = firstNumber,
    number2 = secondNumber;
  if (isNecessaryParseFloat) {
    if (typeof number1 === "string") {
      number1 = parseFloat(number1);
    }
    if (typeof number2 === "string") {
      number2 = parseFloat(number2);
    }
  }
  if (number2 > number2) return 1;
  if (number1 < number2) return -1;
  return 0;
};
