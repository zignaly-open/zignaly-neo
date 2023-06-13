import { ExchangeType } from '../../../../../../apis/user/types';

export type ServiceFormData = {
  serviceType: ExchangeType;
  serviceName: string;
  baseCurrency: string;
  successFee: number;
};

export type ServiceInvestType = {
  profitPercentage: number;
  amountToInvest: number;
};
