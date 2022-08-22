import React, { ChangeEventHandler, ReactElement } from "react";

type LabelActionProps = {
  text: string;
  href?: string;
  tabIndex?: number;
  onClick?: () => void;
};

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
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  name?: string;
  multiline?: boolean;
  onClickRightSideElement?: Function | null;
  leftSideElement?: ReactElement | null;
  rightSideElement?: ReactElement | null;
  labelAction?: LabelActionProps | null;
  withoutBorder?: boolean;
  minHeight?: number;
  maxHeight?: number;
}
