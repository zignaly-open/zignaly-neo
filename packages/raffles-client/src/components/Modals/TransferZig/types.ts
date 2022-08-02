import { DialogProps } from '@mui/material';

export type TransferZigModalProps = DialogProps & {
  transferOnClick: () => void;
  isLoading: boolean;
};
