import React from 'react';
import { CoinIcon } from '@zignaly-open/ui';
// import ETHIcon from 'images/wallet/eth.svg';
import BSCIcon from 'images/chain/bsc.svg';
import { SmallCoinIcon } from '../styles';
// import BTCIcon from 'images/coins/btc.svg';
// import MATICIcon from 'images/coins/matic.svg';
// import SOLIcon from 'images/wallet/sol.svg';
// import TRXIcon from 'images/wallet/trx.svg';

export const getChainIcon = (chain: string) => {
  switch (chain.toUpperCase()) {
    // case 'ETH':
    // return ETHIcon;
    case 'BSC':
      return BSCIcon;
    // case 'BTC':
    //   return BTCIcon;
    // case 'MATIC':
    //   return MATICIcon;
    // case 'SOL':
    //   return SOLIcon;
    // case 'TRX':
    //   return TRXIcon;
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
