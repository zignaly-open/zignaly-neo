import { DialogProps } from '@mui/material';

export type UserSettingsModalProps = DialogProps & {
  username?: string;
  discordName?: string;
};
