import React from 'react';
import BalanceButton from './BalanceButton';
import RewardsButton from './RewardsButton';
import ReferralButton from './ReferralButton';
import { useMediaQuery } from '@mui/material';
import theme from '../../../theme';

const HeaderWidgetButtons = () => {
  const md = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <BalanceButton key={'balance'} />
      <RewardsButton key={'rewards'} />
      {md && <ReferralButton key={'referral'} />}
    </>
  );
};

export default HeaderWidgetButtons;
