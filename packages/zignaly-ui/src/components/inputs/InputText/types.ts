import { ChangeEventHandler, ReactElement } from "react";
export interface InputTextProps {
  placeholder?: string;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
  onChange?: Function;
  disabled?: boolean;
  error?: string | null;
  label?: string | null;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: string;
  /**
   * Value. Use when the component is controlled.
   */
  value?: string;
  readOnly?: boolean;
  rightSideElement?: ReactElement | null;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name?: string;
  multiline?: boolean;
}
