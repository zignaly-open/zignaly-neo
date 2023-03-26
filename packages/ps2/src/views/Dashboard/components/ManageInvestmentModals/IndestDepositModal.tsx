import { DialogProps } from '@mui/material/Dialog';
import React from 'react';
import {
  useCurrentBalance,
  useSelectInvestment,
} from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import useMaybeNavigateNotLoggedIn from '../../../../util/hooks/useMaybeNavigateNotLoggedIn';
import InvestModal from './InvestModal';
import ChooseDepositTypeModal from './ChooseDepositTypeModal';
import ZModal from '../../../../components/ZModal';

function InvestDepositModal({
  serviceId,
  ...props
}: {
  serviceId: string;
  close: () => void;
} & DialogProps): React.ReactElement {
  const {
    isLoading: isLoadingService,
    isFetching,
    data: service,
  } = useServiceDetails(serviceId);
  const { balance, isFetching: isLoadingBalance } = useCurrentBalance(
    service?.ssc,
  );

  useSelectInvestment(service);
  useMaybeNavigateNotLoggedIn();

  const showDeposit = +balance === 0;

  if (isLoadingService || isLoadingBalance || isFetching) {
    return <ZModal title={''} wide {...props} close={close} isLoading />;
  } else if (showDeposit) {
    return <ChooseDepositTypeModal {...props} selectedCoin={service?.ssc} />;
  } else {
    return <InvestModal {...props} />;
  }
}

export default InvestDepositModal;
