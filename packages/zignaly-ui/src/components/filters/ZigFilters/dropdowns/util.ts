import { useMemo } from "react";

export const LABEL_LENGTH_TO_WIDTH = 6.9;
export const VALUE_LENGTH_TO_WIDTH = 9.8;

export const useLongestString = (options: string[]) =>
  useMemo(() => {
    const length = options.reduce((longest, label) => {
      return label.length > longest ? label.length : longest;
    }, 0);
    return length * VALUE_LENGTH_TO_WIDTH;
  }, [options]);
