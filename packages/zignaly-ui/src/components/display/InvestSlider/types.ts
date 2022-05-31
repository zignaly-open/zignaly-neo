export type InvestSliderProps = {
  value: number;
  className?: string;
  style?: React.CSSProperties;
  step?: number;
  min?: number;
  max?: number;
  unit?: string;
  initialValue: number;
  onChange: Function;
  type?: keyof typeof SliderTypes;
};

export const SliderTypes = {
  withdraw: "withdraw",
  deposit: "deposit",
};
