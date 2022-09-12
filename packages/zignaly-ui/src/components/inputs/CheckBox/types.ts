export type CheckBoxProps = {
  value?: boolean;
  defaultValue?: boolean;
  label: string;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};
