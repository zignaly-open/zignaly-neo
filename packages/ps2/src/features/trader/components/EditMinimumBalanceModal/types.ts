import { DialogProps } from '@mui/material/Dialog';

export type MinBalanceModalProps = {
  close: () => void;
  serviceId: string;
} & DialogProps;
