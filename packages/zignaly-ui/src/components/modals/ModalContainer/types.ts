import React from 'react';

export type ModalContainerProps = {
  children: React.ReactElement[] | React.ReactElement;
  title?: any;
  width?: "fullscreen" | "large" | "small" | number;
  customHeaderAction?: null | React.ReactElement;
  open?: boolean;
  onClose?: () => void;
  onGoBack?: any;
}