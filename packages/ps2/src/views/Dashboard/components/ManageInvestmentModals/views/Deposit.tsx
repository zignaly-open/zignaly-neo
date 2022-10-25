import React from 'react';
import DepositForm from '../forms/DepositForm';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../../apis/coin/use';
import CenteredLoader from '../../../../../components/CenteredLoader';
import { DepositModalProps } from '../types';

const DepositView: React.FC<DepositModalProps> = (props) => {
  const { isFetching: isFetchingBalances } = useCoinBalances(true);
  const { isFetching: isFetchingCoins } = useExchangeCoinsList();
  return isFetchingCoins || isFetchingBalances ? (
    <CenteredLoader />
  ) : (
    <DepositForm {...props} />
  );
};

export default DepositView;
