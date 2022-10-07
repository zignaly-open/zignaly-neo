import { DialogProps } from '@mui/material/Dialog';
import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';

export type TransferModalProps = {
  close: () => void;
  serviceId: string;
} & DialogProps;

export type TransferFormData = { amountValue: InputAmountAdvancedValue };
