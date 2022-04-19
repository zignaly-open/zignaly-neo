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
