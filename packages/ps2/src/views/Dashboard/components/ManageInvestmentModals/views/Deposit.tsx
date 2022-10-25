import React from 'react';
import DepositForm from '../forms/DepositForm';
import {
  useCoinBalances,
  useExchangeCoinsList,
} from '../../../../../apis/coin/use';
import CenteredLoader from '../../../../../components/CenteredLoader';

const DepositView: React.FC<{ close: () => void }> = ({ close }) => {
  const { isFetching: isFetchingBalances } = useCoinBalances(true);
  const { isFetching: isFetchingCoins } = useExchangeCoinsList();
  return isFetchingCoins || isFetchingBalances ? (
    <CenteredLoader />
  ) : (
    <>
      <DepositForm close={close} />
    </>
  );
};

export default DepositView;
