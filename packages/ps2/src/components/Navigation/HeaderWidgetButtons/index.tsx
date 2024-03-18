import React from 'react';
import BalanceButton from './BalanceButton';
import RewardsButton from './RewardsButton';
import ReferralButton from './ReferralButton';
import { useMediaQuery, useTheme } from '@mui/material';
import { isFeatureOn } from '../../../whitelabel';
import { Features } from '../../../whitelabel/type';

const HeaderWidgetButtons = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <>
      <BalanceButton key={'balance'} />
      {isFeatureOn(Features.Rewards) && <RewardsButton key={'rewards'} />}
      {isFeatureOn(Features.Referrals) && lg && (
        <ReferralButton key={'referral'} />
      )}
    </>
  );
};

export default HeaderWidgetButtons;
