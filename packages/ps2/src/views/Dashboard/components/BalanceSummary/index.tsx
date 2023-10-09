import React from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { DottedButton, Layout } from './styles';
import { BalanceSummaryProps } from './types';
import EditIcon from '@mui/icons-material/Edit';
import { ZigTypography, ZigPriceLabel } from '@zignaly-open/ui';
import { getColorForNumber } from '../../../../util/numbers';
import { Box } from '@mui/material';

export const BalanceSummary = ({
  prefixId,
  serviceId,
  totalValue,
  profit,
  coin = 'USDT',
  dashboardType = 'investor',
  onClickEdit,
}: BalanceSummaryProps) => {
  // we need editinvestment to have that ns when we fire the modal
  const { t } = useTranslation(['table', 'action', 'edit-investment']);
  return (
    <Layout>
      <Box>
        {dashboardType === 'marketplace' ? (
          <ZigTypography>{t('balanceSummary.invested')}</ZigTypography>
        ) : (
          <ZigPriceLabel
            color={'contrasting'}
            id={prefixId && serviceId && `${prefixId}__invested-${serviceId}`}
            value={new BigNumber(totalValue).toFixed()}
            coin={coin}
          />
        )}
      </Box>
      <Box>
        {isNaN(+profit) || profit === '' ? (
          // eslint-disable-next-line i18next/no-literal-string
          <ZigTypography variant={'body2'} color={'neutral400'}>
            -
          </ZigTypography>
        ) : (
          <ZigPriceLabel
            id={prefixId && serviceId && `${prefixId}__profit-${serviceId}`}
            value={profit}
            coin={coin}
            color={getColorForNumber(profit)}
          />
        )}
      </Box>
      {onClickEdit && (
        <DottedButton
          variant={'text'}
          id={`${prefixId}__edit-${serviceId}`}
          startIcon={<EditIcon sx={{ width: '12px', height: '12px' }} />}
          onClick={onClickEdit}
          sx={{}}
        >
          {t('action:edit')}
        </DottedButton>
      )}
    </Layout>
  );
};
