// eslint-disable-next-line @typescript-eslint/ban-types
export type LogsState = {};

export enum LogEntryActions {
  DISABLE_2FA = 'disable_2fa',
  BAN_USER = 'ban_user',
  UNBAN_USER = 'unban_user',
  APPROVE_DEPOSIT = 'approve_deposit',
  APPROVE_WITHDRAWAL = 'approve_withdrawal',
  REJECT_WITHDRAWAL = 'reject_withdrawal',
}
// eslint-disable-next-line @typescript-eslint/ban-types
export type LogEntry = {
  action: LogEntryActions;
  agentEmail: string;
  agentId: string;
  createdAt: string;
  userId: string;
  userEmail: string;
};

export type LogFilterType = {
  userId?: string;
  agentId?: string;
  user?: string;
  action?: string;
};
