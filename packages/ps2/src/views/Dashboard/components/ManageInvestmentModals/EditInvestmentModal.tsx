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
  useSelectInvestment,
} from '../../../../apis/investment/use';
import WithdrawWithdrawInvestmentSuccessPerform from './views/WithdrawInvestmentPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawInvestmentSuccess';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';
import { usePrefetchTranslation } from '../../../../util/i18nextHelpers';
import { Box, useMediaQuery } from '@mui/material';
import theme from '../../../../theme';

function EditInvestmentModal({
  close,
  serviceId,
  ...props
}: {
  close: () => void;
  serviceId: string;
} & DialogProps): React.ReactElement {
  const { isLoading: isLoadingInvestment } = useInvestmentDetails(serviceId);
  const { isLoading: isLoadingService, data: service } =
    useServiceDetails(serviceId);
  const xs = useMediaQuery(theme.breakpoints.down('sm'));
  useSelectInvestment(service);
  // gotta make sure this is set because right after the setSelectedInvestment the value comes as null
  const selectedInvestment = useSelectedInvestment();
  const { isLoading: isLoadingCoins } = useCoinBalances();

  const [view, setView] = useState<EditInvestmentViews>(
    EditInvestmentViews.EditInvestment,
  );

  const { t } = useTranslation(['edit-investment']);
  usePrefetchTranslation('withdraw');

  const views = {
    [EditInvestmentViews.WithdrawInvestment]: {
      title: t('withdrawal-request'),
      component: () => <WithdrawInvestment setView={setView} />,
    },
    [EditInvestmentViews.WithdrawSuccess]: {
      title: t('withdrawal-success.title'),
      component: () => <WithdrawModalSuccess close={close} />,
    },
    [EditInvestmentViews.WithdrawPerform]: {
      title: t('withdrawal-request'),
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

  const isLoading =
    isLoadingInvestment ||
    isLoadingService ||
    isLoadingCoins ||
    !selectedInvestment;

  return (
    <ZModal
      mobileFullScreen
      {...props}
      wide
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
      <Box paddingX={xs ? 0 : '30px'}>{!isLoading && component()}</Box>
    </ZModal>
  );
}

EditInvestmentModal.trackId = 'edit-investment';

export default EditInvestmentModal;