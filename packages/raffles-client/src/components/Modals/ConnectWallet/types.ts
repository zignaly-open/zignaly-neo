import { DialogProps } from '@mui/material';
import { Connector } from '@web3-react/types';

export type ConnectWalletModalProps = DialogProps;
export type WalletOptionProps = {
  tryActivation: (_connector: Connector) => void;
};
