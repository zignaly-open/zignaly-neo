import { CoinsSelect } from '../../../../../Balance/components/SwapCoinsModal/types';

export type SwapFormProps = {
  coinSwapTo: CoinsSelect;
  coinsAllowedSwapFrom: CoinsSelect[];
  internalId: string;
  closeDepositSwap: () => void;
  refetchBalance: () => void;
};
