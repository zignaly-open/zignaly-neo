import { DialogProps } from '@mui/material/Dialog';

export type ZScoreModalProps = {
  close: () => void;
  serviceId: string;
} & DialogProps;

export type TransferFormData = { amountValue: string };
