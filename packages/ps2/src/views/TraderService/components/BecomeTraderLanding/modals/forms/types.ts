import { ExchangeType } from '../../../../../../apis/user/types';
import { InputAmountAdvancedValue } from '@zignaly-open/ui/lib/components/inputs/InputAmountAdvanced/types';

export type ServiceFormData = {
  serviceType: ExchangeType;
  serviceName: string;
  baseCurrency: string;
  successFee: number;
};

export type ServiceInvestType = {
  profitPercentage: number;
  amountToInvest: InputAmountAdvancedValue & { min: number };
};
