import React from 'react';
import WithdrawForm from '../forms/WithdrawForm';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../../apis/coin/use';
import CenteredLoader from '../../../../../components/CenteredLoader';
import { DepositModalProps } from '../types';

const WithdrawView: React.FC<DepositModalProps> = (props) => {
  // todo: why?
  const { isFetching: isFetchingBalances } = useCoinBalances({ convert: true });
  const { isFetching: isFetchingCoins } = useExchangeCoinsList();
  return isFetchingCoins || isFetchingBalances ? (
    <CenteredLoader />
  ) : (
    <WithdrawForm {...props} />
  );
};

export default WithdrawView;
