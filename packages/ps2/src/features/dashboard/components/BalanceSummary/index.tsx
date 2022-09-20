import React from 'react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { Layout, Profit, TotalValue } from './styles';
import { BalanceSummaryProps } from './types';
import {
  PencilIcon,
  PriceLabel,
  TextButton,
  Typography,
} from '@zignaly-open/ui';

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
        <Typography>{t('table.balanceSummary.invested')}</Typography>
      ) : (
        <TotalValue>
          <PriceLabel value={new BigNumber(totalValue).toFixed()} coin={coin} />
        </TotalValue>
      )}
      {isNaN(+profit) || profit === '' ? (
        // eslint-disable-next-line i18next/no-literal-string
        <Typography variant={'body2'} color={'neutral400'}>
          -
        </Typography>
      ) : (
        <Profit variant='body2'>
          <PriceLabel
            value={profit}
            coin={coin}
            green={+profit > 0}
            red={+profit < 0}
          />
        </Profit>
      )}
      <TextButton
        leftElement={<PencilIcon color='#65647E' width={16} height={16} />}
        caption={t('action:action.edit')}
        color={'links'}
        onClick={onClickEdit}
      />
    </Layout>
  );
};
