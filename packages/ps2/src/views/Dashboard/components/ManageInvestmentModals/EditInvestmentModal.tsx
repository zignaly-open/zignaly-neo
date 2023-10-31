import React, { useMemo, useState } from 'react';
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
import CriticalError from '../../../../components/Stub/CriticalError';

function EditInvestmentModal({
  close,
  serviceId,
  ...props
}: {
  close: () => void;
  serviceId: string;
} & DialogProps): React.ReactElement {
  const { isLoading: isLoadingInvestment, isError: isErrorLoadingInvestment } =
    useInvestmentDetails(serviceId);
  const {
    isLoading: isLoadingService,
    isError: isErrorLoadingService,
    data: service,
  } = useServiceDetails(serviceId);
  const xs = useMediaQuery(theme.breakpoints.down('sm'));
  useSelectInvestment(service);
  // gotta make sure this is set because right after the setSelectedInvestment the value comes as null
  const selectedInvestment = useSelectedInvestment();
  const { isLoading: isLoadingCoins, isError: isErrorLoadingCoins } =
    useCoinBalances();

  const [view, setView] = useState<EditInvestmentViews>(
    EditInvestmentViews.EditInvestment,
  );

  const { t } = useTranslation(['edit-investment']);
  usePrefetchTranslation('withdraw');

  const views = useMemo(() => {
    return {
      [EditInvestmentViews.WithdrawInvestment]: {
        title: t('withdrawal-request'),
        component: WithdrawInvestment,
      },
      [EditInvestmentViews.WithdrawSuccess]: {
        title: t('withdrawal-success.title'),
        component: WithdrawModalSuccess,
      },
      [EditInvestmentViews.WithdrawPerform]: {
        title: t('withdrawal-request'),
        component: WithdrawWithdrawInvestmentSuccessPerform,
      },
      [EditInvestmentViews.PendingTransactions]: {
        title: t('modal.pendingTransaction.title'),
        component: PendingTransactionsList,
      },
      [EditInvestmentViews.EditInvestment]: {
        title: t('modal.editInvestments.title'),
        component: EditInvestment,
      },
      [EditInvestmentViews.EditInvestmentSuccess]: {
        title: t('modalSuccess.title'),
        component: EditInvestmentSuccess,
      },
    };
  }, [setView, close]);

  const { title, component: Component } =
    views[view in views ? view : EditInvestmentViews.EditInvestment];

  const isLoading =
    isLoadingInvestment ||
    isLoadingService ||
    isLoadingCoins ||
    !selectedInvestment;

  const isError =
    isErrorLoadingInvestment || isErrorLoadingService || isErrorLoadingCoins;

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
      <Box paddingX={xs ? 0 : '30px'}>
        {!isLoading && !isError && (
          <Component close={close} setView={setView} />
        )}
        {isError && <CriticalError />}
      </Box>
    </ZModal>
  );
}

EditInvestmentModal.trackId = 'edit-investment';

export default EditInvestmentModal;
