import { DialogProps } from '@mui/material/Dialog';
import { ShowFnOutput, UseModalOptions } from 'mui-modal-provider';
import { SxProps } from '@mui/system';

export type ZModalProps = {
  title?: string;
  wide?: boolean;
  allowUnauth?: boolean;
  mobileFullScreen?: boolean;
  isLoading?: boolean;
  disableBackdropClose?: boolean;
  onGoBack?: () => void;
  width?: number;
  close?: () => void;
  titleAlign?: 'center' | 'left';
  titleStyles?: SxProps;
} & DialogProps;

export type UseZModalOptions = UseModalOptions & {
  customClose?: (modal?: ShowFnOutput<void>) => void;
};

export type ZDialogProps = DialogProps & { close: () => void };
