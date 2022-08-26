import React, { ReactElement } from 'react';

export type ModalContainerProps = {
  children: React.ReactElement[] | React.ReactElement;
  title?: ReactElement | string;
  titleAlign?: 'center' | 'left';
  width?: number;
  padding?: number;
  customHeaderAction?: null | React.ReactElement;
  onClickClose?: () => void;
  onGoBack?: () => void;
};
