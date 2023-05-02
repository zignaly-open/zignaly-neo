import { DialogProps } from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import {
  useCurrentBalance,
  useSelectedInvestment,
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

  // gotta make sure this is set because right after the setSelectedInvestment the value comes as null
  const selectedInvestment = useSelectedInvestment();
  // we need this only once
  const loading =
    isLoadingService || isLoadingBalance || isFetching || !selectedInvestment;
  const [ready, setReady] = useState(!loading);
  useEffect(() => {
    setReady((r) => !loading || r);
  }, [loading]);

  useSelectInvestment(service);
  useMaybeNavigateNotLoggedIn();

  const showDeposit = +balance === 0;

  if (!ready) {
    return <ZModal title={''} wide {...props} close={close} isLoading />;
  } else if (showDeposit) {
    return <ChooseDepositTypeModal {...props} selectedCoin={service?.ssc} />;
  } else {
    return <InvestModal {...props} />;
  }
}

export default InvestDepositModal;
