import { ZigFilter } from "../../types";

export type FilterProps = {
  filter: ZigFilter;
  onChange: (filter: ZigFilter) => void;
  mobile?: boolean;
};
