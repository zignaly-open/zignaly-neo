import { ZigFilter } from "components/filters/ZigFilters/types";

export type MobileFilterDrawerProps = {
  filters: ZigFilter | ZigFilter[];
  open: boolean;
  onClose: () => void;
  onChange: (filter: ZigFilter) => void;
  resetFilters: () => void;
  prefixId: string;
};
