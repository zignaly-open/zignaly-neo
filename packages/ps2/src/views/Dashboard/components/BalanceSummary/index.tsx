import React from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Layout } from './styles';
import { BalanceSummaryProps } from './types';
import {
  PencilIcon,
  TextButton,
  ZigTypography,
  ZigPriceLabel,
} from '@zignaly-open/ui';
import { getColorForNumber } from '../../../../util/numbers';
import { Box } from '@mui/material';

export const BalanceSummary = ({
  prefixId,
  serviceId,
  totalValue,
  profit,
  coin = 'USDT',
  dashboardType = 'investor',
  onClickEdit = () => null,
}: BalanceSummaryProps) => {
  const { t } = useTranslation(['table', 'action']);
  return (
    <Layout>
      <Box id={`${prefixId}__invested-${serviceId}`}>
        {dashboardType === 'marketplace' ? (
          <ZigTypography>{t('balanceSummary.invested')}</ZigTypography>
        ) : (
          <ZigPriceLabel
            value={new BigNumber(totalValue).toFixed()}
            coin={coin}
          />
        )}
      </Box>
      <Box id={`${prefixId}__profit-${serviceId}`}>
        {isNaN(+profit) || profit === '' ? (
          // eslint-disable-next-line i18next/no-literal-string
          <ZigTypography variant={'body2'} color={'neutral400'}>
            -
          </ZigTypography>
        ) : (
          <ZigPriceLabel
            value={profit}
            coin={coin}
            color={getColorForNumber(profit)}
          />
        )}
      </Box>

      <TextButton
        id={`${prefixId}__edit-${serviceId}`}
        leftElement={<PencilIcon color='#65647E' width={16} height={16} />}
        caption={t('action:edit')}
        color={'links'}
        onClick={onClickEdit}
      />
    </Layout>
  );
};
