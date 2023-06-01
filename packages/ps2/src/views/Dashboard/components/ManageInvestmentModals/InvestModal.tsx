import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { useSelectedInvestment } from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';
import InvestView from './views/Invest';
import { UseModalReturn } from './types';

export function useInvestModalContent({
  close,
}: {
  close: () => void;
}): UseModalReturn {
  const service = useSelectedInvestment();
  const { isLoading: isLoadingService } = useServiceDetails(service?.serviceId);
  const { isLoading: isLoadingCoins } = useCoinBalances();
  const { t } = useTranslation('edit-investment');
  const isLoading = isLoadingService || isLoadingCoins;
  const [isInvested, setIsInvested] = useState(false);
  return {
    title: t(isInvested ? 'modalSuccess.title' : 'invest-modal.invest-with'),
    component: () =>
      !isLoading && (
        <InvestView
          close={close}
          isInvested={isInvested}
          setIsInvested={setIsInvested}
        />
      ),
  };
}
function InvestModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const service = useSelectedInvestment();
  const { isLoading: isLoadingService } = useServiceDetails(service?.serviceId);
  const { isLoading: isLoadingCoins } = useCoinBalances();
  const isLoading = isLoadingService || isLoadingCoins;
  const { title, component } = useInvestModalContent({ close });

  return (
    <ZModal wide {...props} close={close} title={title} isLoading={isLoading}>
      {component()}
    </ZModal>
  );
}

InvestModal.trackId = 'invest';

export default InvestModal;
