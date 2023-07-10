import { DialogProps } from '@mui/material/Dialog';
import { ShowFnOutput, UseModalOptions } from 'mui-modal-provider';

export type ZModalProps = {
  title?: string;
  wide?: boolean;
  allowUnauth?: boolean;
  isLoading?: boolean;
  disableBackdropClose?: boolean;
  onGoBack?: () => void;
  width?: number;
  close?: () => void;
  titleAlign?: 'center' | 'left';
} & DialogProps;

export type UseZModalOptions = UseModalOptions & {
  customClose?: (modal?: ShowFnOutput<void>) => void;
};

export type ZDialogProps = DialogProps & { close: () => void };
