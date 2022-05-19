export enum SelectSizes {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
}

export type OptionItem = {
  index: number;
  leftElement?: any;
  caption: string;
};

export type SelectProps = {
  name?: string;
  label?: string;
  size?: SelectSizes;
  disabled?: boolean;
  className?: string;
  placeholder: string;
  onChange: any;
  options?: OptionItem[];
  value?: OptionItem | null;
  mode?: "default" | "collapsed";
  initialSelectedIndex?: number | null;
  fullWidth?: boolean;
};
