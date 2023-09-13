// eslint-disable-next-line @typescript-eslint/ban-types
export type TransfersState = {};

export type WithdrawalData = {
  id: string;
  userId: string;
  createdAt: string | null;
  amount: number;
  currency: string;
  status: string;
  email: string;
  title: string;
  transactionId: string;
  riskLevel: string | null;
  exposureType: string;
  nullable: true | null;
};

export type DepositData = {
  amount: number;
  coin: string;
  createdAt: string;
  email: string;
  id: string;
  userId: string;

  exposureType: string | null;
  riskLevel: string | null;
  status: string | null;
  transactionId: string;
};

export type TransferFilterType = {
  userId: string;
  user: string;
  amount: number;
  operator: 'gte' | 'lte' | 'gt' | 'lt';
};

export type TransferActionPayloadType = {
  id: string;
};
