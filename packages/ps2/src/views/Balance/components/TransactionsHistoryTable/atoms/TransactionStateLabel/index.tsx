import { ZigTypography } from '@zignaly-open/ui';
import { TransactionStateType } from 'apis/coin/types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { transactionStateName, transactionStateColor } from './types';
import { Tooltip } from '@mui/material';

const TransactionStateLabel = ({
  state,
  id,
}: {
  state: TransactionStateType;
  id?: string;
}) => {
  const { t } = useTranslation('transactions-history');
  return (
    <Tooltip
      title={
        ['reviewing', 'pending_to_approve'].includes(state)
          ? t('status.reviewing-tooltip')
          : ''
      }
    >
      <ZigTypography color={transactionStateColor[state]} id={id}>
        {t(transactionStateName[state])}
      </ZigTypography>
    </Tooltip>
  );
};

export default TransactionStateLabel;
