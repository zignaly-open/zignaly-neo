import React from 'react';
import { ReactComponent as SilverIcon } from '../../../images/kyc/silver.svg';
import { ReactComponent as GoldIcon } from '../../../images/kyc/gold.svg';
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

const kycEnvLevels = process.env.REACT_APP_KYC_LEVELS;
let environmentConfig: Record<'kyc' | 'kyb', [string, string]> = null;

if (kycEnvLevels) {
  try {
    environmentConfig = JSON.parse(kycEnvLevels);
  } catch (e) {
    // Too bad :(
    // eslint-disable-next-line no-console
    console.error('KYC Config: not a valid JSON');
  }
}

export const hasValidKycConfig = !!environmentConfig;

const kycConfig: Record<'kyc' | 'kyb', KycDefinitionConfig[]> = {
  kyc: [
    {
      color: '#fff',
      icon: <SilverIcon />,
      restriction: silverRestriction,
      requirements: `requirements-level-1`,
      label: `name-level-1`,
      name: environmentConfig?.kyc?.[0],
    },
    {
      color: '#FFD232',
      icon: <GoldIcon />,
      restriction: goldRestriction,
      requirements: `requirements-level-2`,
      label: `name-level-2`,
      name: environmentConfig?.kyc?.[1],
    },
  ],
  kyb: [
    {
      color: '#fff',
      icon: <SilverIcon />,
      restriction: silverRestriction,
      requirements: `requirements-level-1-corp`,
      label: `name-level-1`,
      name: environmentConfig?.kyb?.[0],
    },
    {
      color: '#FFD232',
      icon: <GoldIcon />,
      restriction: goldRestriction,
      requirements: `requirements-level-2-corp`,
      label: `name-level-2`,
      name: environmentConfig?.kyb?.[1],
    },
  ],
};

export default kycConfig;
