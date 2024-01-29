import { ZigTypography, ZigButton } from '@zignaly-open/ui';
import { ZigCopyIcon } from '@zignaly-open/ui/icons';
import React from 'react';
import { InviteBox, InviteUrlInput, StyledInviteIcon } from './styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useToast } from 'util/hooks/useToast';
import copy from 'copy-to-clipboard';
import { generatePath } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from 'routes';

const ReferralLinkInvite = ({
  serviceId,
  referralCode,
  link,
  title,
}: {
  serviceId?: string;
  referralCode?: string;
  link?: string;
  title?: string;
}) => {
  const toast = useToast();
  const { t } = useTranslation(['referrals-trader', 'service', 'action']);
  const url =
    link ??
    `${window.origin}${generatePath(ROUTE_TRADING_SERVICE, {
      serviceId: serviceId,
    })}?invite=${referralCode}&subtrack=${serviceId}`;

  return (
    <Box display='flex' gap='22px' px='22px'>
      <InviteBox>
        <StyledInviteIcon />
        <Box display='flex' flexDirection={'column'}>
          <ZigTypography
            color='neutral300'
            variant='h3'
            fontWeight={400}
            id='referrals-invite-referral-link-label'
          >
            {t(title ?? 'trader-referral-link')}
          </ZigTypography>
          <InviteUrlInput
            value={url}
            id='referrals-invite-modal__referral-link'
            readOnly
          />
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
        id='referrals-invite-modal__copy-link'
        onClick={() => {
          copy(url);
          toast.success(t('copied', { ns: 'action' }));
        }}
        startIcon={<ZigCopyIcon />}
      >
        {t('copy-link', { ns: 'service' })}
      </ZigButton>
    </Box>
  );
};

export default ReferralLinkInvite;
