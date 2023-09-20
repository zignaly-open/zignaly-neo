import React from 'react';
import { ZigClockAltIcon, ZigTypography } from '@zignaly-open/ui';
import { LimitedTimeChip, LimitedTimeChipArrow } from '../styles';
import { useTranslation } from 'react-i18next';

const ReferralLimitedTime = () => {
  const { t } = useTranslation('referrals');
  return (
    <LimitedTimeChip className='limited-time'>
      <ZigClockAltIcon />
      <ZigTypography fontSize={14} color={'greenGraph'} fontWeight={500}>
        {t('limited-time')}
      </ZigTypography>
      <LimitedTimeChipArrow />
    </LimitedTimeChip>
  );
};

export default ReferralLimitedTime;
