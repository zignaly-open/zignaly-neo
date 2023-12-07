import { useMemo } from "react";

const LENGTH_TO_WIDTH = 9.4;

export const useLongestString = (options: string[]) =>
  useMemo(() => {
    const length = options.reduce((longest, label) => {
      return label.length > longest ? label.length : longest;
    }, 0);
    return length * LENGTH_TO_WIDTH;
  }, [options]);
