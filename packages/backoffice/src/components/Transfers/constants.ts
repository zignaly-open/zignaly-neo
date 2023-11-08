import {
  DepositStatuses,
  WithdrawalStatuses,
} from '../../apis/transfers/types';
import { TypographyProps } from '@mui/material';

export const withdrawalStatusColorMap: Record<
  WithdrawalStatuses,
  TypographyProps['color']
> = {
  [WithdrawalStatuses.STATUS_PENDING]: 'yellow',
  [WithdrawalStatuses.STATUS_REVIEWING]: 'yellow',
  [WithdrawalStatuses.STATUS_PENDING_TO_APPROVE]: 'yellow',
  [WithdrawalStatuses.STATUS_REJECTED]: 'redGraphOrError',
  [WithdrawalStatuses.STATUS_ERROR]: 'redGraphOrError',
  [WithdrawalStatuses.STATUS_APPROVED]: 'greenGraph',
  [WithdrawalStatuses.STATUS_CLOSED]: 'greenGraph',
  [WithdrawalStatuses.STATUS_SENT]: 'greenGraph',
  [WithdrawalStatuses.STATUS_TRANSFER]: 'greenGraph',
};

export const depositStatusColorMap: Record<
  DepositStatuses,
  TypographyProps['color']
> = {
  [DepositStatuses.STATUS_IN_REVIEW]: 'yellow',
  [DepositStatuses.STATUS_BLOCKED_BY_RISK]: 'redGraphOrError',
  [DepositStatuses.STATUS_BLOCKED_BY_LIMIT]: 'redGraphOrError',
  [DepositStatuses.STATUS_BLOCKED_BY_ERROR]: 'redGraphOrError',
  [DepositStatuses.STATUS_COMPLETED]: 'greenGraph',
};
