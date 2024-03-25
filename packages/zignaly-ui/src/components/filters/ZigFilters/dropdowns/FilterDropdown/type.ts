import { ZigFilter } from "../../types";

export type FilterDropdownProps = {
  resetFilter: () => void;
  onChange: (filter: ZigFilter) => void;
  filter: ZigFilter;
  separator: boolean;
  mobile: boolean;
  prefixId?: string;
  position?: "left" | "right";
};
