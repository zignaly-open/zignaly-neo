import { DialogProps } from '@mui/material';

export type ProjectDetailsModalProps = DialogProps & {
  title: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
};
