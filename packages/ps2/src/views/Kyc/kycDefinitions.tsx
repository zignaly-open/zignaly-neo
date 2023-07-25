import React from 'react';
import { ReactComponent as SilverIcon } from '../../images/kyc/silver.svg';
import { ReactComponent as GoldIcon } from '../../images/kyc/gold.svg';
import { KycDefinitionConfig } from './types';

const silverRestriction = {
  from: '0',
  to: '100k',
  coin: 'USDT',
};

const goldRestriction = {
  from: '100k',
  coin: 'USDT',
};

const kycConfig: Record<'kyc' | 'kyb', KycDefinitionConfig[]> = {
  kyc: [
    {
      color: '#fff',
      icon: <SilverIcon />,
      restriction: silverRestriction,
      requirements: `requirements-level-1`,
      label: `name-level-1`,
      name: 'Silver',
    },
    {
      color: '#FFD232',
      icon: <GoldIcon />,
      restriction: goldRestriction,
      requirements: `requirements-level-2`,
      label: `name-level-2`,
      name: 'Gold',
    },
  ],
  kyb: [
    {
      color: '#fff',
      icon: <SilverIcon />,
      restriction: silverRestriction,
      requirements: `requirements-level-1-corp`,
      label: `name-level-1`,
      name: 'Silver_Corporate',
    },
    {
      color: '#FFD232',
      icon: <GoldIcon />,
      restriction: goldRestriction,
      requirements: `requirements-level-2-corp`,
      label: `name-level-2`,
      name: 'Gold_Corporate',
    },
  ],
};

export default kycConfig;