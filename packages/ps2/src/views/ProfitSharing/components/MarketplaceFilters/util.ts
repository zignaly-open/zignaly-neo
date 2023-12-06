import { ZigFiltersType, filterFns } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';
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

export const filterServices = (
  services: MarketplaceService[],
  filters: ZigFiltersType,
) =>
  services.filter((service) => {
    return filters?.every((filter) => {
      if (filter.id === 'returns') {
        return filterFns.inNumberRange(
          +service.pnlPercent180t,
          filter.value as [number, number],
        );
      } else if (filter.id === 'coin') {
        return (
          !filter.value || (filter.value as string[]).includes(service.ssc)
        );
      } else if (filter.id === 'type') {
        const serviceType = service.type.split('_')[1];
        return (
          !filter.value || (filter.value as string[]).includes(serviceType)
        );
      } else if (filter.id === 'fee') {
        return filterFns.inNumberRange(
          service.successFee,
          filter.value as [number, number],
        );
      }
      return true;
    });
  });
