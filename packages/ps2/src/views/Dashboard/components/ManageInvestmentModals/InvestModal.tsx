import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogProps } from '@mui/material/Dialog';
import { useSelectedInvestment } from '../../../../apis/investment/use';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';
import InvestView from './views/Invest';

function InvestModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const service = useSelectedInvestment();
  const { isLoading: isLoadingService } = useServiceDetails(service?.serviceId);
  const { isLoading: isLoadingCoins } = useCoinBalances();
  const { t } = useTranslation('edit-investment');
  const isLoading = isLoadingService || isLoadingCoins;
  const [isInvested, setIsInvested] = useState(false);

  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={t(isInvested ? 'modalSuccess.title' : 'invest-modal.invest-with')}
      isLoading={isLoading}
    >
      {!isLoading && (
        <InvestView
          close={close}
          isInvested={isInvested}
          setIsInvested={setIsInvested}
        />
      )}
    </ZModal>
  );
}

InvestModal.trackId = 'invest';

export default InvestModal;
