import { Investment } from '../investment/types';
import { MarketplaceService } from './types';
import { ChartDataFormat, Service } from '../service/types';

export function marketplaceServiceToInvestmentType(
  service: MarketplaceService,
): Partial<Investment> {
  return {
    serviceId: service.id,
    ssc: service.ssc,
    serviceName: service.name,
    serviceLogo: service.logo,
    ownerName: service.ownerName,
    sparklines: service.sparklines as unknown as ChartDataFormat,
    createdAt: service.createdAt,
    ownerVerified: service.ownerVerified,
    pnl30dPct: service.pnlPercent30t.toString(),
    pnl90dPct: service.pnlPercent90t.toString(),
    pnl180dPct: service.pnlPercent180t.toString(),
  };
}

export function marketplaceServiceToServiceType(
  service: MarketplaceService,
): Partial<Service> {
  return service;
}
