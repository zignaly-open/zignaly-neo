import { DialogProps } from '@mui/material';

export type UserSettingsModalProps = DialogProps & {
  userName?: string;
  discordName?: string;
};
