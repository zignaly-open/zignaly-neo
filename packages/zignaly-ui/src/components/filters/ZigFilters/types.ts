export type ZigFiltersProps = {
  value: string;
  onChange: (value: string) => void;
  id: string;
};

export type ZigFilter = {
  type: "slider" | "checkbox" | "select";
  value: any;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  allowNoMin?: boolean;
  allowNoMax?: boolean;
};

export type ZigFiltersType = ZigFilter[];
