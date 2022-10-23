import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DepositViews, EditInvestmentViews } from './types';
import { DialogProps } from '@mui/material/Dialog';
import EditInvestment from './views/EditInvestment';
import WithdrawFunds from './views/WithdrawFunds';
import PendingTransactionsList from './views/PendingTransactionsList';
import {
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../../../apis/investment/use';
import WithdrawPerform from './views/WithdrawPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawSuccess';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';

function DepositModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const [view, setView] = useState<DepositViews>(DepositViews.Start);

  const { t } = useTranslation(['edit-investment', 'withdraw-your-investment']);

  const views = {
    [DepositViews.Start]: {
      title: t('withdraw-your-investment:title'),
      component: () => <WithdrawFunds setView={setView} />,
    },
    [DepositViews.Purchase]: {
      title: t('withdraw-your-investment:success.title'),
      component: () => <WithdrawModalSuccess close={close} />,
    },
    [DepositViews.Deposit]: {
      title: t('withdraw-your-investment:title'),
      component: () => <WithdrawPerform setView={setView} />,
    },
  };

  const { title, component } =
    views[view in views ? view : EditInvestmentViews.EditInvestment];

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

export default DepositModal;
