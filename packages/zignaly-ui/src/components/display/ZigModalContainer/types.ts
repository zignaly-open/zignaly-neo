import React, { ReactElement } from "react";
import { SxProps } from '@mui/system';

export type ModalContainerProps = {
  children: React.ReactElement[] | React.ReactElement;
  title?: ReactElement | string;
  titleAlign?: "center" | "left";
  width?: number;
  padding?: number;
  onClickClose?: () => void;
  onGoBack?: () => void;
  titleStyles?: SxProps;
};
