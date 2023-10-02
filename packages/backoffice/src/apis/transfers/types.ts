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
  userId?: string;
  amount?: number;
  operator?: 'gte' | 'lte' | 'gt' | 'lt' | 'eq';
  status?: string;
};

export type TransferActionPayloadType = {
  id: string;
};

export enum DepositStatuses {
  STATUS_IN_REVIEW = 'reviewing',
  STATUS_BLOCKED_BY_RISK = 'blocked_by_risk',
  STATUS_BLOCKED_BY_LIMIT = 'blocked_by_limit',
  STATUS_BLOCKED_BY_ERROR = 'blocked_by_error',
  STATUS_COMPLETED = 'completed',
}

export enum WithdrawalStatuses {
  STATUS_PENDING = 'pending',
  STATUS_TRANSFER = 'transfer',
  STATUS_SENT = 'sent',
  STATUS_CLOSED = 'closed',
  STATUS_ERROR = 'error',
  STATUS_PENDING_TO_APPROVE = 'pending_to_approve',
  STATUS_APPROVED = 'approved',
  STATUS_REVIEWING = 'reviewing',
  STATUS_REJECTED = 'rejected',
}
