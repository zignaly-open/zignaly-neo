import { DialogProps } from '@mui/material';
import { TransactionType } from 'apis/ps2/coin/types';

export type ExportModalProps = {
  close: () => void;
  type?: TransactionType;
} & DialogProps;
