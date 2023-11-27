import { CheckboxFilter } from "../../types";

export type CheckBoxFilterProps = {
  filter: CheckboxFilter;
  onChange: (filter: CheckboxFilter) => void;
};
