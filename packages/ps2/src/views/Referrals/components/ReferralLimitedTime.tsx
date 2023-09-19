import React from 'react';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { ZigTypography } from '@zignaly-open/ui';
import { LimitedTimeChip, LimitedTimeChipArrow } from '../styles';
import { useTranslation } from 'react-i18next';

const ReferralLimitedTime = () => {
  const { t } = useTranslation('referrals');
  return (
    <LimitedTimeChip className='limited-time'>
      <BoltIcon width={10} height={19} />
      <ZigTypography fontSize={14} color={'greenGraph'} fontWeight={500}>
        {t('limited-time')}
      </ZigTypography>
      <LimitedTimeChipArrow />
    </LimitedTimeChip>
  );
};

export default ReferralLimitedTime;
