import { Investment } from '../../../../apis/investment/types';

export interface ServiceNameProps {
  prefixId?: string;
  service: Investment;
  showCoin?: boolean;
  size?: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
  showOwner?: boolean;
  truncateServiceName?: boolean;
  activeLink?: boolean;
  className?: string;
  zscore?: number;
}
