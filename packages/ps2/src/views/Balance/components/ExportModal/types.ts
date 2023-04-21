import { DialogProps } from '@mui/material';
import { TransactionType } from 'apis/coin/types';

export type ExportModalProps = {
  close: () => void;
  type?: TransactionType;
} & DialogProps;
