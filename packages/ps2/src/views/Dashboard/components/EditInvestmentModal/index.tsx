import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@mui/material';
import { LoaderContainer } from './styles';
import { Loader } from '@zignaly-open/ui';
import { EditInvestmentViews } from './types';
import { DialogProps } from '@mui/material/Dialog';
import EditInvestment from './views/EditInvestment';
import WithdrawFunds from './views/WithdrawFunds';
import PendingTransactionsList from './views/PendingTransactionsList';
import ModalContainer from 'components/ModalContainer';
import {
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../../../apis/investment/use';
import WithdrawPerform from './views/WithdrawPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawSuccess';
import { useServiceDetails } from '../../../../apis/trader/use';
import { useCoinBalances } from '../../../../apis/coin/use';

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
      component: () => <WithdrawFunds setView={setView} />,
    },
    [EditInvestmentViews.WithdrawSuccess]: {
      title: t('withdraw-your-investment:success.title'),
      component: () => <WithdrawModalSuccess close={close} />,
    },
    [EditInvestmentViews.WithdrawPerform]: {
      title: t('withdraw-your-investment:title'),
      component: () => <WithdrawPerform setView={setView} />,
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

  return (
    <Modal
      {...props}
      onClose={close}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <ModalContainer
        width={784}
        title={title}
        onClickClose={close}
        onGoBack={
          ![
            EditInvestmentViews.EditInvestment,
            EditInvestmentViews.EditInvestmentSuccess,
            EditInvestmentViews.WithdrawSuccess,
          ].includes(view)
            ? () => setView(EditInvestmentViews.EditInvestment)
            : undefined
        }
      >
        {isLoadingInvestment || isLoadingService || isLoadingCoins ? (
          <LoaderContainer>
            <Loader
              color={'#fff'}
              ariaLabel={t('modal.editInvestments.loading')}
            />
          </LoaderContainer>
        ) : (
          component()
        )}
      </ModalContainer>
    </Modal>
  );
}

export default EditInvestmentModal;
