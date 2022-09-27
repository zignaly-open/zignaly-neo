import { DialogProps } from '@mui/material';

export type ConnectionCanceledModalProps = DialogProps & {
  onCancel: () => void;
};
