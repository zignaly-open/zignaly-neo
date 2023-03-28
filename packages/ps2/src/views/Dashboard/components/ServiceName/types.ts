import { Investment } from '../../../../apis/investment/types';

export interface ServiceNameProps {
  prefixId?: string;
  service: Investment;
  showCoin?: boolean;
}
