export const sortByValue = (number1: string | number, number2: string | number) => {
  return +number1 - +number2;
};

export const trimZeros = (v: string | number) => {
  return v?.toString()?.replace(/(\.\d*?[1-9]+)0+$|\.0+$/g, "$1");
};

export const numberOfDecimals = (v: string | number) => {
  return (v?.toString()?.split(".")[1] ?? "").length;
};

export const formatCompactNumber = (value: number | string, precision = 8) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: precision,
    notation: "compact",
    compactDisplay: "short",
  }).format(+value);
