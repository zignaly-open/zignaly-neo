import { DepositStatuses } from '../../apis/transfers/types';
import { TypographyProps } from '@mui/material';

export const statusColorMap: Record<DepositStatuses, TypographyProps['color']> =
  {
    [DepositStatuses.STATUS_IN_REVIEW]: 'yellow',
    [DepositStatuses.STATUS_BLOCKED_BY_RISK]: 'redGraphOrError',
    [DepositStatuses.STATUS_BLOCKED_BY_LIMIT]: 'redGraphOrError',
    [DepositStatuses.STATUS_BLOCKED_BY_ERROR]: 'redGraphOrError',
    [DepositStatuses.STATUS_COMPLETED]: 'greenGraph',
  };
