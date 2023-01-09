import { QueryReturnTypeBasic } from 'util/queryReturnType';

export interface WithdrawConfirmFormProps {
  action: () => void;
  back: () => void;
  close: () => void;
  status: QueryReturnTypeBasic<unknown>;
  address: string;
  tag?: string;
  coin: string;
  networkName: string;
  networkCoin: string;
  amount: number;
  fee: number;
  iconBucket?: string;
}
