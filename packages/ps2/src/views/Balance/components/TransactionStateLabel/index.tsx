import { ZigTypography } from '@zignaly-open/ui';
import { TransactionStateType } from 'apis/coin/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as styled from './styles';

import { transactionStateName, transactionStateColor } from './types';

const TransactionStateLabel = ({ state }: { state: TransactionStateType }) => {
  const { t } = useTranslation('transactions-history');
  return (
    <ZigTypography color={transactionStateColor[state]}>
      {t(transactionStateName[state])}
    </ZigTypography>
  );
};

export default TransactionStateLabel;
