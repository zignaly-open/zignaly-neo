import { DialogProps } from '@mui/material/Dialog';

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
