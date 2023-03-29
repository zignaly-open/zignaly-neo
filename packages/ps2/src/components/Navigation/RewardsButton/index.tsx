import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_REWARDS } from '../../../routes';
import { useActiveExchange } from '../../../apis/user/use';
import { useBalanceQuery } from '../../../apis/user/api';
import { TicketShapeIndependent } from '../../TicketShape/atoms';

const RewardsButton = () => {
  const { internalId } = useActiveExchange();
  const { t } = useTranslation('rewards');

  const { data: balance } = useBalanceQuery(internalId);

  if (!balance?.totalFreeUSDT) return null;

  return (
    <Link to={generatePath(ROUTE_REWARDS)}>
      <TicketShapeIndependent
        sx={{ borderRadius: '4px', height: '40px', cursor: 'pointer' }}
        backgroundRgb={'53, 51, 74'}
        backgroundRgbHover={'63, 61, 84'}
        hole={8}
      >
        <Box
          sx={{
            gap: '10px',
            marginLeft: '2px',
            height: '100%',
            marginRight: '2px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <img
            src={'/images/referrals/gift-mini.png'}
            width='24'
            height='25'
            alt={'gift'}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
              {t('header.title')}
            </ZigTypography>
            <ZigTypography
              sx={{
                mt: '1px',
                fontSize: '10px',
                lineHeight: 1.3,
                textAlign: 'center',
              }}
            >
              {t('header.description')}
            </ZigTypography>
          </Box>
        </Box>
      </TicketShapeIndependent>
    </Link>
  );
};

export default RewardsButton;
