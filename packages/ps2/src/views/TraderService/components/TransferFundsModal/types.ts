import { DialogProps } from '@mui/material/Dialog';
import { InputAmountAdvancedValueType } from '@zignaly-open/ui';

export type TransferModalProps = {
  close: () => void;
  serviceId: string;
} & DialogProps;

export type TransferFormData = { amountValue: InputAmountAdvancedValueType };
