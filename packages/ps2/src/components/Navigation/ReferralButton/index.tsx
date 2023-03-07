import React from 'react';
import { Box } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_REFERRALS } from '../../../routes';

const ReferralButton = () => {
  const { t } = useTranslation('referrals');
  return (
    <Link to={generatePath(ROUTE_REFERRALS)}>
      <>
        <ZigButton
          component={'a'}
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
          id={'trader-api__create-key'}
          variant='outlined'
        >
          <CardGiftcardIcon sx={{ height: 22, width: 22 }} />
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
                fontSize: '12px',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {t('header.title')}
            </ZigTypography>
            <ZigTypography
              sx={{
                mt: '1px',
                fontSize: '10px',
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {t('header.description')}
            </ZigTypography>
          </Box>
        </ZigButton>
      </>
    </Link>
  );
};

export default ReferralButton;
