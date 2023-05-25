import React from 'react';
import { Box } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_REFERRALS } from '../../../../routes';
import { GradientBorderButtonWrapper } from './atoms';

const ReferralButton = () => {
  const { t } = useTranslation('common');
  return (
    <Link to={generatePath(ROUTE_REFERRALS)}>
      <GradientBorderButtonWrapper>
        <ZigButton
          id='menu__referral-link'
          component={'div'}
          sx={{
            cursor: 'pointer',
            pl: 1,
            pr: 1,
            pt: 0.5,
            pb: 0.5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          variant='outlined'
        >
          <img
            src={'/images/referrals/envelope-mini.png'}
            style={{ height: 22, width: 22 }}
            alt={'referral'}
          />
          <Box
            component={'span'}
            sx={{
              display: 'flex',
              ml: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ZigTypography
              color={'primary'}
              sx={{
                fontSize: '13px',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {t('header.referrals.title')}
            </ZigTypography>
            <ZigTypography
              sx={{
                mt: '1px',
                fontSize: '11px',
                lineHeight: 1.3,
                textAlign: 'center',
              }}
              color='neutral200'
            >
              {t('header.referrals.description')}
            </ZigTypography>
          </Box>
        </ZigButton>
      </GradientBorderButtonWrapper>
    </Link>
  );
};

export default ReferralButton;
