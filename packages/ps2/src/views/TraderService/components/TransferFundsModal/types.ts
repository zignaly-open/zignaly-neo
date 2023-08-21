import { DialogProps } from '@mui/material/Dialog';

export type TransferModalProps = {
  close: () => void;
  serviceId: string;
} & DialogProps;

export type TransferFormData = { amountValue: string };
