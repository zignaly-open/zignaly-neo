export type MessageModalTypesProps = {
  title: string;
  description: string;
  onClickClose: () => void;
  width?: "fullscreen" | "large" | "small" | number;
};
