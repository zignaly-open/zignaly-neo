import { Service } from '../service/types';
import { InvestmentServiceDetails } from './types';

export function serviceToInvestmentServiceDetail(
  service: Service,
): InvestmentServiceDetails {
  return {
    ownerVerified: service.ownerVerified,
    serviceName: service.name,
    serviceLogo: service.logo,
    serviceId: service.id,
    ssc: service.ssc,
  };
}
