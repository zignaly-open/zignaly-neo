import { ZigFilter } from "../../../types";

export type MobileFiltersDrawerProps = {
  onChange: (filter: ZigFilter) => void;
  resetFilter: () => void;
  filter: ZigFilter;
  label: string | JSX.Element;
  prefixId?: string;
};
