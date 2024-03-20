import { SxProps } from '@mui/system';

export interface AssetsInPoolProps {
  assetsValue: string;
  numberOfInvestors?: number;
  convertedValue?: number;
  convertedValueCoin?: string;
  createdAt?: string;
  shorten?: boolean;
  prefixId?: string;
  serviceId: string;
  priceLabelSx?: SxProps;
}
