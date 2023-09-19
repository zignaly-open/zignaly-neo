import { CoinsSelect } from '../../../../../Balance/components/SwapCoinsModal/types';
import {
  ChooseDepositTypeViews,
  ConfirmSwapDataType,
  ConvertPreviewType,
} from '../../types';

export type SwapFormProps = {
  coinSwapTo: string;
  coinsAllowedSwapFrom: CoinsSelect[];
  setView: (view: ChooseDepositTypeViews) => void;
  setConfirmSwapData: (data: ConfirmSwapDataType) => void;
  setConvertPreviewData: (data: ConvertPreviewType) => void;
};
export type SwapDepositPurchaseProps = {
  coin: string;
  setView: (view: ChooseDepositTypeViews) => void;
  isLoadingBalances: boolean;
  coinOptionsAllowedSwapFrom: CoinsSelect[];
  setConfirmSwapData: (data: ConfirmSwapDataType) => void;
  setConvertPreviewData: (data: ConvertPreviewType) => void;
};
