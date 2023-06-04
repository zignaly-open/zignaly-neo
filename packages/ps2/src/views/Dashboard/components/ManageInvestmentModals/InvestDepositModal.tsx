import { DialogProps } from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import {
  useCurrentBalance,
  useSelectedInvestment,
  useSelectInvestment,
} from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import useMaybeNavigateNotLoggedIn from '../../../../util/hooks/useMaybeNavigateNotLoggedIn';
import { useInvestModalContent } from './InvestModal';
import { useIsAuthenticated } from '../../../../apis/user/use';
import { UseModalReturn } from './types';
import { useDepositModalContent } from './ChooseDepositTypeModal';
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
  const isAuthenticated = useIsAuthenticated();
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

  const depositModal = useDepositModalContent(service?.ssc);
  const investModal = useInvestModalContent({ close: props.close });

  const showDeposit = +balance === 0;

  // we need it here because this modal is not technically a ZModal
  if (!isAuthenticated) {
    props.close();
    return null;
  }

  const { title, component } =
    (showDeposit ? depositModal : investModal) || ({} as UseModalReturn);

  return (
    <ZModal
      title={ready ? title : ''}
      wide
      {...props}
      close={props.close}
      isLoading={!ready}
    >
      {ready && component()}
    </ZModal>
  );
}

export default InvestDepositModal;
