import { DialogProps } from '@mui/material/Dialog';

export type ZModalProps = {
  title: string;
  wide?: boolean;
  isLoading?: boolean;
  onGoBack?: () => void;
  width?: number;
  close: () => void;
} & DialogProps;
