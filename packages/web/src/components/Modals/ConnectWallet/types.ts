import { DialogProps } from '@mui/material';

export type ConnectWalletModalProps = DialogProps & {
  metaMaskOnClick: () => void;
  walletConnectOnClick: Function;
};
