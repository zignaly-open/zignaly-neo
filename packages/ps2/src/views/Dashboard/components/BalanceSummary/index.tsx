import React from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Layout } from './styles';
import { BalanceSummaryProps } from './types';
import {
  PencilIcon,
  TextButton,
  Typography,
  ZigPriceLabel,
} from '@zignaly-open/ui';
import { getColorForNumber } from '../../../../util/numbers';

export const BalanceSummary = ({
  totalValue,
  profit,
  coin = 'USDT',
  dashboardType = 'investor',
  onClickEdit = () => null,
}: BalanceSummaryProps) => {
  const { t } = useTranslation(['table', 'action']);
  return (
    <Layout>
      {dashboardType === 'marketplace' ? (
        <Typography>{t('balanceSummary.invested')}</Typography>
      ) : (
        <ZigPriceLabel
          value={new BigNumber(totalValue).toFixed()}
          coin={coin}
        />
      )}
      {isNaN(+profit) || profit === '' ? (
        // eslint-disable-next-line i18next/no-literal-string
        <Typography variant={'body2'} color={'neutral400'}>
          -
        </Typography>
      ) : (
        <ZigPriceLabel
          value={profit}
          coin={coin}
          color={getColorForNumber(profit)}
        />
      )}
      <TextButton
        leftElement={<PencilIcon color='#65647E' width={16} height={16} />}
        caption={t('action:edit')}
        color={'links'}
        onClick={onClickEdit}
      />
    </Layout>
  );
};
