import { ExchangeType } from '../../../../../../apis/user/types';
import { InputAmountAdvancedValueType } from '@zignaly-open/ui';

export type ServiceFormData = {
  serviceType: ExchangeType;
  serviceName: string;
  baseCurrency: string;
  successFee: number;
};

export type ServiceInvestType = {
  profitPercentage: number;
  amountToInvest: InputAmountAdvancedValueType & { min: number };
};
