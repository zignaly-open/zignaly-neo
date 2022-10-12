import { DialogProps } from '@mui/material/Dialog';

export type ZModalProps = {
  title: string;
  isLoading?: boolean;
  onGoBack?: () => void;
  width?: number;
  close: () => void;
} & DialogProps;
