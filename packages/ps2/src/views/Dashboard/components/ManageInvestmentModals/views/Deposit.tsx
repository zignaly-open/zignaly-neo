import React from 'react';
import DepositForm from '../forms/DepositForm';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../../apis/coin/use';
import { DepositModalProps } from '../types';
import { useActivateExchange } from 'apis/user/use';
import { CenteredLoader } from '@zignaly-open/ui';

const DepositView: React.FC<DepositModalProps> = (props) => {
  const { isFetching: isFetchingBalances } = useCoinBalances({ convert: true });
  const { isFetching: isFetchingCoins } = useExchangeCoinsList();
  const { isFetching: isActivating } = useActivateExchange();

  return isActivating || isFetchingCoins || isFetchingBalances ? (
    <CenteredLoader />
  ) : (
    <DepositForm {...props} />
  );
};

export default DepositView;
