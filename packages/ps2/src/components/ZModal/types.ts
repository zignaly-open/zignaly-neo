import { DialogProps } from '@mui/material/Dialog';
import { UseModalOptions } from 'mui-modal-provider';

export type ZModalProps = {
  title: string;
  wide?: boolean;
  authOnly?: boolean;
  isLoading?: boolean;
  onGoBack?: () => void;
  width?: number;
  close: () => void;
  titleAlign?: 'center' | 'left';
} & DialogProps;

export type UseZModalOptions = UseModalOptions & { customClose?: () => void };
