import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_REWARDS } from '../../../routes';
import TicketShape, { TicketShapeIndependent } from '../../TicketShape/atoms';
import { useBenefitsQuery } from '../../../apis/referrals/api';
import { VOUCHER_PENDING } from '../../../apis/referrals/types';

const RewardsButton = () => {
  const { t } = useTranslation('rewards');
  const { data: benefits } = useBenefitsQuery();

  if (!benefits?.every((x) => x.status === VOUCHER_PENDING)) return null;

  return (
    <Link to={generatePath(ROUTE_REWARDS)}>
      <TicketShape
        sx={{ borderRadius: '4px', padding: '1px' }}
        backgroundRgb={'22, 42, 71'}
        backgroundRgbHover={'37, 35, 57'}
        hole={8}
      >
        <TicketShapeIndependent
          sx={{ borderRadius: '3px', height: '40px', cursor: 'pointer' }}
          backgroundRgb={'13, 28, 56'}
          backgroundRgbHover={'53, 51, 74'}
          hole={9}
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
      </TicketShape>
    </Link>
  );
};

export default RewardsButton;
