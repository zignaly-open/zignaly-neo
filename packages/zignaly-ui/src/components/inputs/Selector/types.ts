export enum SelectSizes {
  SMALL = "small",
  NORMAL = "normal",
  LARGE = "large",
}

export type OptionItem = {
  leftElement?: any;
  caption: string;
};

export type SelectProps = {
  name?: string;
  label?: string;
  size?: SelectSizes;
  disabled?: boolean;
  className?: string;
  placeholder?: string | React.ReactElement;
  onChange: (item: any) => void;
  options?: OptionItem[];
  value?: OptionItem | null;
  mode?: "default" | "collapsed";
  initialSelectedIndex?: number | null;
  fullWidth?: boolean;
  maxHeight?: number;
  transparent?: boolean;
  isMenuActive?: boolean;
};
