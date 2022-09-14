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
  useCoins,
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../use';
import WithdrawPerform from './views/WithdrawPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawSuccess';
import { useServiceDetails } from '../../../trader/use';

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
  const { isLoading: isLoadingCoins } = useCoins();

  const [view, setView] = useState<EditInvestmentViews>(
    EditInvestmentViews.EditInvestment,
  );

  const { t } = useTranslation(['edit-investment', 'withdraw-your-investment']);

  const views = {
    [EditInvestmentViews.WithdrawInvestment]: {
      title: t(
        'withdraw-your-investment:withdraw-your-investment.success.title',
      ),
      component: () => <WithdrawFunds setView={setView} />,
    },
    [EditInvestmentViews.WithdrawSuccess]: {
      title: t('edit-investment.modal.withdrawInvestment.title'),
      component: () => <WithdrawModalSuccess close={close} />,
    },
    [EditInvestmentViews.WithdrawPerform]: {
      title: t('withdraw-your-investment:withdraw-your-investment.title'),
      component: () => <WithdrawPerform setView={setView} />,
    },
    [EditInvestmentViews.PendingTransactions]: {
      title: t('edit-investment.modal.pendingTransaction.title'),
      component: () => <PendingTransactionsList setView={setView} />,
    },
    [EditInvestmentViews.EditInvestment]: {
      title: t('edit-investment.modal.editInvestments.title'),
      component: () => <EditInvestment setView={setView} close={close} />,
    },
    [EditInvestmentViews.EditInvestmentSuccess]: {
      title: t('edit-investment.modalSuccess.title'),
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
              ariaLabel={t('edit-investment.modal.editInvestments.loading')}
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
