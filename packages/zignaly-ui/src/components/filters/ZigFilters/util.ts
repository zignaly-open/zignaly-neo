import { CheckboxFilter } from "./types";

export const FilterFns = {
  inNumberRange: (value: number, [min, max]: [number | null, number | null]) => {
    return ((!min && min !== 0) || value >= min) && ((!max && max !== 0) || value <= max);
  },

  inOptionsChecked: (value: string, options: CheckboxFilter["options"]) => {
    const checkedOptions = options.filter((o) => o.checked).map((o) => o.value);
    return checkedOptions.includes(value);
  },
};
