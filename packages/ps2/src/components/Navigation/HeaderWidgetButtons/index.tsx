import React from 'react';
import BalanceButton from './BalanceButton';
import RewardsButton from './RewardsButton';
import ReferralButton from './ReferralButton';
import { useMediaQuery } from '@mui/material';
import theme from '../../../theme';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';

const HeaderWidgetButtons = () => {
  const md = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <BalanceButton key={'balance'} />
      {isFeatureOn(Features.Rewards) && <RewardsButton key={'rewards'} />}
      {isFeatureOn(Features.Referrals) && md && (
        <ReferralButton key={'referral'} />
      )}
    </>
  );
};

export default HeaderWidgetButtons;