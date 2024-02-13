import { ZigTypography, ZigButton } from '@zignaly-open/ui';
import { ZigCopyIcon } from '@zignaly-open/ui/icons';
import React from 'react';
import { InviteBox, InviteUrlInput, StyledInviteIcon } from './styles';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useToast } from 'util/hooks/useToast';
import copy from 'copy-to-clipboard';
import { generatePath } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from 'routes';
import useShare from 'util/hooks/useShare';

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
  const { isReady, isSupported, share } = useShare({});
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const toast = useToast();
  const { t } = useTranslation([
    'referrals-trader',
    'service',
    'action',
    'referrals',
  ]);
  const url =
    link ??
    `${window.origin}${generatePath(ROUTE_TRADING_SERVICE, {
      serviceId: serviceId,
    })}?invite=${referralCode}&subtrack=${serviceId}`;

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box display='flex' gap='22px' px='22px'>
        <InviteBox>
          <StyledInviteIcon />
          <Box display='flex' flexDirection={'column'}>
            <ZigTypography
              color='neutral300'
              variant={sm ? 'h5' : 'h3'}
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
          {sm && (
            <IconButton
              id='referrals-invite-modal__copy-link'
              color='primary'
              onClick={() => {
                copy(url);
                toast.success(t('copied', { ns: 'action' }));
              }}
            >
              <ZigCopyIcon style={{ fill: '#89899A' }} />
            </IconButton>
          )}
        </InviteBox>
        {!sm && (
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
        )}
      </Box>
      {isReady && isSupported && (
        <ZigButton
          sx={{ mt: 2, width: 200 }}
          variant={'contained'}
          size={'large'}
          onClick={() => {
            share({
              title: t('referral-invite-title'),
              text: t('referral-invite-text'),
              url: link,
            });
          }}
        >
          {t('create-invite.create-invite', { ns: 'referrals' })}
        </ZigButton>
      )}
    </Box>
  );
};

export default ReferralLinkInvite;
