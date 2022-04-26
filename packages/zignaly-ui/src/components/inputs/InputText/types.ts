import { ChangeEventHandler } from "react";
export interface InputTextProps {
    placeholder: string;
    onBlur?: ChangeEventHandler<HTMLInputElement>;
    onChange: Function;
    disabled: boolean;
    error?: string | null;
    label?: string | null;
    rightSideElement?: any | null;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  };
