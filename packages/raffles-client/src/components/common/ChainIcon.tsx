import React from 'react';
import { chains } from 'util/chain';

export const ChainIcon = ({ chain }: { chain: string }) => {
  const chainData = chains[chain];
  if (!chainData) {
    return null;
  }

  const Icon = chainData.icon;
  return <Icon title={chainData.name} width={25} height={25} />;
};
