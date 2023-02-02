import { DialogProps } from '@mui/material';

export type TransferZigModalProps = DialogProps;

export interface ITransferField {
  amount: {
    token: {
      id: string;
      balance: string;
    };
    value: string;
  };
}
