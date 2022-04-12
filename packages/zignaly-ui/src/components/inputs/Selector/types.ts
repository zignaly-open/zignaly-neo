export enum SelectSizes {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
}

export type OptionItem = {
  leftElement: string;
  caption: string;
};

export type SelectProps = {
  size?: SelectSizes;
  options?: OptionItem[];
  label?: string;
  name: string;
  placeholder: string;
  value?: string | null;
  disabled?: boolean;
  initialSelectedIndex: number | null;
  onSelectItem: any;
};
