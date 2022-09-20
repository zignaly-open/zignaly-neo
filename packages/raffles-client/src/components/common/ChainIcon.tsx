import React from 'react';
import { ReactComponent as ETHIcon } from 'assets/icons/chains/eth.svg';
import { ReactComponent as BSCIcon } from 'assets/icons/chains/eth.svg';
import { ReactComponent as MATICIcon } from 'assets/icons/chains/eth.svg';
import { ReactComponent as SOLIcon } from 'assets/icons/chains/eth.svg';
import { ReactComponent as AVAXIcon } from 'assets/icons/chains/eth.svg';

const chains = {
  ETH: { name: 'Ethereum', icon: ETHIcon },
  BSC: { name: 'Binance Smart Chain', icon: BSCIcon },
  MATIC: { name: 'Polygon', icon: MATICIcon },
  SOL: { name: 'Solana', icon: SOLIcon },
  AVAX: { name: 'Avalanche', icon: AVAXIcon },
};

export const ChainIcon = ({ chain }: { chain: string }) => {
  const chainData = chains[chain];
  if (!chainData) {
    return null;
  }

  const Icon = chainData.icon;
  return <Icon title={chainData.name} width={24} height={24} />;
};
