import React from 'react';
import BSCIcon from 'images/chain/bsc.svg';
import ETHIcon from 'images/chain/eth.svg';
import { SmallCoinIcon } from '../styles';

export const getChainIcon = (chain: string) => {
  switch (chain.toUpperCase()) {
    case 'ETH':
      return ETHIcon;
    case 'BSC':
      return BSCIcon;
    default:
      return null;
  }
};

const ChainIcon = ({ network }: { network: string }) => {
  const icon = getChainIcon(network);

  return icon ? (
    <img width={24} height={24} src={icon} />
  ) : (
    <SmallCoinIcon size={'small'} coin={network} name='' />
  );
};

export default ChainIcon;
