import { DialogProps } from '@mui/material/Dialog';
import { ZScoreRiskCategory } from '@zignaly-open/ui';

export type ZScoreModalProps = {
  close: () => void;
  serviceId: string;
} & DialogProps;

export type TransferFormData = { amountValue: string };

export type ZScoreConfigItem = {
  id: string;
  label: string;
  valueId: string;
  valueType?: 'pct' | 'duration-day' | 'bool' | 'amount';
};

export type ZScoreConfig = Record<
  ZScoreRiskCategory,
  {
    name: string;
    scoreId: string;
    scoreCategoryId: string;
    items: ZScoreConfigItem[];
  }
>;
