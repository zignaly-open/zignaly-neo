import { DialogProps } from '@mui/material';

export type DialogContainerProps = DialogProps & {
  title: string;
  paddingVariant?: 'large' | 'small';
};
