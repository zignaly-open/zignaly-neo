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
import { useCurrentUser, useIsAuthenticated } from '../../../../apis/user/use';
import { UseModalReturn } from './types';
import { useDepositModalContent } from './ChooseDepositTypeModal';
import ZModal from '../../../../components/ZModal';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { track } from '@zignaly-open/tracker';
import {
  useCanInvestIn,
  withModalRequiresAuthentication,
} from '../../../../util/walls/util';
import { useZModal, useZRouteModal } from '../../../../components/ZModal/use';
import { useCoinBalances } from '../../../../apis/coin/use';

function InvestDepositModal({
  serviceId,
  ...props
}: {
  serviceId: string;
  close: () => void;
} & DialogProps): React.ReactElement {
  const checkCanInvest = useCanInvestIn();
  useEffect(() => {
    if (!checkCanInvest(true)) {
      props.close();
    }
  }, []);

  const {
    isLoading: isLoadingService,
    isFetching,
    data: service,
  } = useServiceDetails(serviceId);
  const isAuthenticated = useIsAuthenticated();
  const {
    balance,
    isFetching: isLoadingBalance,
    refetch: refetchBalance,
  } = useCurrentBalance(service?.ssc);
  const { data: coinBalances, isLoading: isLoadingCoinBalances } =
    useCoinBalances({
      convert: true,
    });

  // gotta make sure this is set because right after the setSelectedInvestment the value comes as null
  const selectedInvestment = useSelectedInvestment();
  // we need this only once
  const loading =
    isLoadingService ||
    isLoadingBalance ||
    isFetching ||
    !selectedInvestment ||
    isLoadingCoinBalances;
  const [ready, setReady] = useState(!loading);
  useEffect(() => {
    setReady((r) => !loading || r);
  }, [loading]);

  const { userId } = useCurrentUser();

  useSelectInvestment(service);
  useMaybeNavigateNotLoggedIn()();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down('sm'));

  const trackAwareClose = () => {
    // we need this because we're not using the normal zmodal
    track({ userId });
    props.close();
  };

  const depositModal = useDepositModalContent({
    coin: service?.ssc,
    refetchBalance,
    serviceId,
    balances: coinBalances,
    isLoadingBalances: isLoadingCoinBalances,
    close: trackAwareClose,
  });
  const investModal = useInvestModalContent({ close: trackAwareClose });

  const showDeposit = useMemo(() => +balance === 0, [ready]);

  // the logic below is for tracking only
  const trackHash = showDeposit ? depositModal.view : 'invest';
  useEffect(() => {
    // if not authenticated, we'll be redirecting right away
    if (isAuthenticated && ready) {
      track({
        // make sure we reuse the exact same track id
        hash: trackHash,
        userId,
      });
    }
  }, [trackHash, ready, isAuthenticated]);

  // we need it here because this modal is not technically a ZModal
  if (!isAuthenticated) {
    props.close();
    return null;
  }

  const { title, component, modalWidth, ...rest } =
    (showDeposit ? depositModal : investModal) || ({} as UseModalReturn);

  return (
    <ZModal
      title={ready ? title : ''}
      {...rest}
      {...props}
      close={trackAwareClose}
      isLoading={!ready}
      wide
      mobileFullScreen
      width={modalWidth}
    >
      <Box paddingX={!showDeposit && !(xs && rest.mobileFullScreen) && '30px'}>
        {ready && component()}
      </Box>
    </ZModal>
  );
}

const InvestDepositModalAuth =
  withModalRequiresAuthentication(InvestDepositModal);

// We should not do this because the logic inside this InvestDeposit makes sure we call the right track
// InvestDepositModal.trackId = 'invest-deposit';

export const useOpenInvestDepositModal = (
  modalRoute?: string,
): ((serviceId: string) => void) => {
  const showInvestModal = useZRouteModal(modalRoute);
  const checkCanInvest = useCanInvestIn();
  const { showModal } = useZModal({ disableAutoDestroy: true });
  return (serviceId) => {
    if (checkCanInvest()) {
      if (modalRoute) {
        showInvestModal({ serviceId });
      } else {
        showModal(InvestDepositModalAuth, { serviceId });
      }
    }
  };
};

export default InvestDepositModalAuth;
