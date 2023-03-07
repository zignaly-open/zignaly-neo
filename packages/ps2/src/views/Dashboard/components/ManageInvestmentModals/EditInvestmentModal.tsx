import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditInvestmentViews } from './types';
import { DialogProps } from '@mui/material/Dialog';
import EditInvestment from './views/EditInvestment';
import WithdrawInvestment from './views/WithdrawInvestment';
import PendingTransactionsList from './views/PendingTransactionsList';
import {
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../../../apis/ps2/investment/use';
import WithdrawWithdrawInvestmentSuccessPerform from './views/WithdrawInvestmentPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawInvestmentSuccess';
import { useServiceDetails } from '../../../../apis/ps2/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';

function EditInvestmentModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const service = useSelectedInvestment();
  const { isLoading: isLoadingInvestment } = useInvestmentDetails(
    service.serviceId,
  );
  const { isLoading: isLoadingService } = useServiceDetails(service.serviceId);
  const { isLoading: isLoadingCoins } = useCoinBalances();

  const [view, setView] = useState<EditInvestmentViews>(
    EditInvestmentViews.EditInvestment,
  );

  const { t } = useTranslation(['edit-investment', 'withdraw-your-investment']);

  const views = {
    [EditInvestmentViews.WithdrawInvestment]: {
      title: t('withdraw-your-investment:title'),
      component: () => <WithdrawInvestment setView={setView} />,
    },
    [EditInvestmentViews.WithdrawSuccess]: {
      title: t('withdraw-your-investment:success.title'),
      component: () => <WithdrawModalSuccess close={close} />,
    },
    [EditInvestmentViews.WithdrawPerform]: {
      title: t('withdraw-your-investment:title'),
      component: () => (
        <WithdrawWithdrawInvestmentSuccessPerform setView={setView} />
      ),
    },
    [EditInvestmentViews.PendingTransactions]: {
      title: t('modal.pendingTransaction.title'),
      component: () => <PendingTransactionsList setView={setView} />,
    },
    [EditInvestmentViews.EditInvestment]: {
      title: t('modal.editInvestments.title'),
      component: () => <EditInvestment setView={setView} close={close} />,
    },
    [EditInvestmentViews.EditInvestmentSuccess]: {
      title: t('modalSuccess.title'),
      component: () => <EditInvestmentSuccess close={close} />,
    },
  };

  const { title, component } =
    views[view in views ? view : EditInvestmentViews.EditInvestment];

  const isLoading = isLoadingInvestment || isLoadingService || isLoadingCoins;
  return (
    <ZModal
      wide
      {...props}
      close={close}
      title={title}
      onGoBack={
        ![
          EditInvestmentViews.EditInvestment,
          EditInvestmentViews.EditInvestmentSuccess,
          EditInvestmentViews.WithdrawSuccess,
        ].includes(view)
          ? () => setView(EditInvestmentViews.EditInvestment)
          : undefined
      }
      isLoading={isLoading}
    >
      {!isLoading && component()}
    </ZModal>
  );
}

EditInvestmentModal.trackId = 'edit-investment';

export default EditInvestmentModal;
