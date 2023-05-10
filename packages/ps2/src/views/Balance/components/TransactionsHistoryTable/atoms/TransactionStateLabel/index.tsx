import { ZigTypography } from '@zignaly-open/ui';
import { TransactionStateType } from 'apis/coin/types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { transactionStateName, transactionStateColor } from './types';

const TransactionStateLabel = ({
  state,
  id,
}: {
  state: TransactionStateType;
  id?: string;
}) => {
  const { t } = useTranslation('transactions-history');
  return (
    <ZigTypography color={transactionStateColor[state]} id={id}>
      {t(transactionStateName[state])}
    </ZigTypography>
  );
};

export default TransactionStateLabel;
