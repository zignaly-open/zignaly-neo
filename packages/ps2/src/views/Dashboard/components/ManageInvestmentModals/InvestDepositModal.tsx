import { DialogProps } from '@mui/material/Dialog';
import React, { useEffect, useMemo, useState } from 'react';
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
import { Box } from '@mui/material';

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
  useMaybeNavigateNotLoggedIn()();

  const depositModal = useDepositModalContent(service?.ssc, props.close);
  const investModal = useInvestModalContent({ close: props.close });

  const showDeposit = useMemo(() => +balance === 0, [ready]);

  // we need it here because this modal is not technically a ZModal
  if (!isAuthenticated) {
    props.close();
    return null;
  }

  const { title, component, onGoBack } =
    (showDeposit ? depositModal : investModal) || ({} as UseModalReturn);

  return (
    <ZModal
      title={ready ? title : ''}
      {...props}
      close={props.close}
      isLoading={!ready}
      onGoBack={onGoBack}
      wide
    >
      <Box paddingX={!showDeposit && '30px'}>{ready && component()}</Box>
    </ZModal>
  );
}

// InvestDepositModal.trackId = 'invest';

export default InvestDepositModal;
