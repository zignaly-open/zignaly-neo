import { ChangeEventHandler, ReactElement } from "react";
export interface InputTextProps {
  placeholder: string;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange: Function;
  disabled: boolean;
  error?: string | null;
  label?: string | null;
  defaultValue: string;
  readOnly: boolean;
  rightSideElement?: ReactElement | null;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
}
