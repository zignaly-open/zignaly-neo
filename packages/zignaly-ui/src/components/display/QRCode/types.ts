export enum LevelEnum {
  L = "L",
  M = "M",
  Q = "Q",
  H = "H",
}

export type QRCodeProps = {
  label?: string | null;
  value?: string;
  bgColor?: string;
  fgColor?: string;
  size?: number;
  level?: LevelEnum;
  includeMargin?: boolean;
};
