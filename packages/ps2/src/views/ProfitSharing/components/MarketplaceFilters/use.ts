import { ZigFiltersType } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';

const coins = ['USDT', 'USDC', 'BNB', 'ETH', 'BTC'];

export const useMarketplaceFilters = () => {
  const { t } = useTranslation('marketplace');

  return [
    {
      type: 'slider',
      value: [null, null],
      label: t('filters.returns-months', { count: 6 }),
      allowNoMin: true,
      allowNoMax: true,
      min: 0,
      max: 100,
      id: 'returns',
      showInBar: true,
    },
    {
      type: 'checkbox',
      value: null,
      label: t('filters.coins'),
      options: coins.map((coin) => ({ value: coin, label: coin })),
      id: 'coin',
      showInBar: true,
    },
    {
      type: 'checkbox',
      label: t('filters.type'),
      options: [
        { value: 'spot', label: t('filters.spot') },
        { value: 'futures', label: t('filters.futures') },
      ],
      value: null,
      id: 'type',
    },
    {
      type: 'slider',
      value: [0, 100],
      label: t('filters.fee'),
      min: 0,
      max: 100,
      id: 'fee',
    },
  ] as ZigFiltersType;
};
