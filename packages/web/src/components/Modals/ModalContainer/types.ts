import React from 'react';

export type ModalContainerProps = {
  children: React.ReactElement[] | React.ReactElement;
  title?: any;
  width?: number;
  customHeaderAction?: null | React.ReactElement;
  onClickClose?: () => void | null;
  onGoBack?: () => void;
  centerHeaderText?: boolean;
};
