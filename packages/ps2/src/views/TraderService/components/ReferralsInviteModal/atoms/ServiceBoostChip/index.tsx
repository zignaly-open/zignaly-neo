import React from 'react';
import { ReactComponent as BoltIcon } from 'images/referrals/bolt.svg';
import { BoostBox } from './styles';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';

const ServiceBoostChip = ({ boost }: { boost: number }) => {
  const { t } = useTranslation('referrals-trader');
  return (
    <BoostBox>
      <BoltIcon width={10} height={19} />
      <ZigTypography fontSize={14} fontWeight={600} color='#eede75'>
        {t('trader-boost-value', { boost: +boost.toFixed(2) })}
      </ZigTypography>
    </BoostBox>
  );
};

export default ServiceBoostChip;
