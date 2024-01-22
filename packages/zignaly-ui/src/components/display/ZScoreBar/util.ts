/**
 * Round a set of numbers to 100%, handling rounding errors.
 */
export const roundScorePct = (numbers: number[]) => {
  const total = numbers.reduce((acc, num) => acc + num, 0);
  const roundedValues = numbers.map((num) => Math.round((num / total) * 100));
  const roundingError = roundedValues.reduce((acc, val) => acc + val, 0) - 100;

  if (roundingError !== 0) {
    const adjust = (index: number, value: number) => {
      roundedValues[index] += value;
    };

    // Find the index of the number with the lowest and highest decimals
    const minDecimalIndex = numbers.reduce(
      (minIndex, num, currentIndex) =>
        num % 1 < numbers[minIndex] % 1 && num % 1 >= 0.5 ? currentIndex : minIndex,
      0,
    );

    const maxDecimalIndex = numbers.reduce(
      (maxIndex, num, currentIndex) =>
        num % 1 > numbers[maxIndex] % 1 && num % 1 < 0.5 ? currentIndex : maxIndex,
      0,
    );

    // Adjust the values
    if (roundingError > 0) {
      adjust(minDecimalIndex, -roundingError);
    } else {
      adjust(maxDecimalIndex, roundingError);
    }
  }

  return roundedValues;
};
