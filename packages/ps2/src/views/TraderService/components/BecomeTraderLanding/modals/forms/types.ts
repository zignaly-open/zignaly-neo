import { ExchangeType } from '../../../../../../apis/user/types';

export type ServiceFormData = {
  serviceType: ExchangeType;
  serviceLogo: string;
  serviceName: string;
  baseCurrency: string;
  successFee: number;
  selectExchange: string;
};

export type ServiceInvestType = {
  profitPercentage: number;
  amountToInvest: number;
};
