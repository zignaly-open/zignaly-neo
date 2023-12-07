import { ZigFiltersType, filterFns } from '@zignaly-open/ui';
import { MarketplaceService } from 'apis/marketplace/types';

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
