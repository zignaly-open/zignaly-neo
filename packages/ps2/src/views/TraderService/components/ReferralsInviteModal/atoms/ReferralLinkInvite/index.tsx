import { ZigTypography, ZigButton, ZigInviteIcon } from '@zignaly-open/ui';
import React from 'react';
import { InviteBox, StyledInviteIcon } from './styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useToast } from 'util/hooks/useToast';
import copy from 'copy-to-clipboard';

const ReferralLinkInvite = ({
  serviceId,
  referralCode,
}: {
  serviceId: string;
  referralCode: string;
}) => {
  const toast = useToast();
  const { t } = useTranslation(['referrals-trader', 'service', 'action']);
  const url = `https://zignaly.com/profit-sharing/${serviceId}?=${referralCode}`;
  return (
    <>
      <InviteBox>
        <StyledInviteIcon />
        <Box display='flex' flexDirection={'column'}>
          <ZigTypography color='neutral300' variant='h3' fontWeight={400}>
            {t('trader-referral-link')}
          </ZigTypography>
          <ZigTypography color='#ffffff' variant='h3' whiteSpace={'nowrap'}>
            {url}
          </ZigTypography>
        </Box>
      </InviteBox>
      <ZigButton
        sx={{
          height: '68px',
          minWidth: '152px',
          textTransform: 'uppercase',
          fontWeight: 600,
          fontSize: '15px',
        }}
        onClick={() => {
          // trackClick({
          //   userId,
          //   ctaId: 'deposit-modal__deposit-address',
          // });
          copy();
          toast.success(t('copied', { ns: 'action' }));
        }}
      >
        {t('copy-link', { ns: 'service' })}
      </ZigButton>
    </>
  );
};

export default ReferralLinkInvite;
