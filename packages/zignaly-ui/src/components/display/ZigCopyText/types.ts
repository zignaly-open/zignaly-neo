import { ZigInputProps } from "../../inputs/ZigInput/types";

export type ZigCopyTextProps = Omit<
  ZigInputProps,
  "onChange" | "href" | "readonly" | "disabled" | "labelAction" | "value"
> & {
  value: string;
  copyElementId?: string;
  onCopied?: () => void;
};
