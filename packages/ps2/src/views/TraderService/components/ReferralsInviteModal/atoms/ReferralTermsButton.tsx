import { ChevronRight } from '@mui/icons-material';
import { ZigButton } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HELP_REFERRAL } from 'util/constants';

const ReferralTermsButton = () => {
  const { t } = useTranslation('referrals-trader');
  return (
    <ZigButton
      variant={'text'}
      sx={{ fontSize: '16px !important' }}
      endIcon={
        <ChevronRight
          sx={{
            color: 'links',
            fill: 'currentColor !important',
            fontSize: '20px',
          }}
        />
      }
      id='referrals__terms-link'
      href={HELP_REFERRAL}
      target='_blank'
      rel='noopener'
    >
      {t('terms')}
    </ZigButton>
  );
};

export default ReferralTermsButton;
