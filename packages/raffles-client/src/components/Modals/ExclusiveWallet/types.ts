import { DialogProps } from '@mui/material';

export const WalletTypeId = {
  kucoin: 'kucoin',
  metamask: 'metamask',
};

export type ExclusiveWalletProps = DialogProps & {
  wallet?: keyof typeof WalletTypeId;
};
