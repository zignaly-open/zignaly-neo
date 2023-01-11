import React from 'react';
import BSCIcon from 'images/chain/bsc.svg';
import ETHIcon from 'images/chain/eth.svg';
import MATICIcon from 'images/chain/matic.svg';
import { ZigCoinIcon } from '@zignaly-open/ui';

export const getChainIcon = (chain: string) => {
  switch (chain.toUpperCase()) {
    case 'ETH':
      return ETHIcon;
    case 'BSC':
      return BSCIcon;
    case 'MATIC':
      return MATICIcon;
    default:
      return null;
  }
};

const ChainIcon = ({ network }: { network: string }) => {
  const icon = getChainIcon(network);

  return icon ? (
    <img width={24} height={24} src={icon} />
  ) : (
    <ZigCoinIcon size='small' coin={network} />
  );
};

export default ChainIcon;
