export const checkDecimals = (val: string | number, maxDecimals: number) => {
  if (!val) return true;

  const splitValueDot = val.toString().split(".");
  // Handle incorrect number
  if (splitValueDot.length > 2) return false;

  const decimals = splitValueDot.length === 1 ? 0 : splitValueDot[1].length;

  return decimals <= maxDecimals;
};
