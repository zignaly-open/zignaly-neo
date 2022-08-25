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
  useStoredCoins,
} from '../../use';
import WithdrawPerform from './views/WithdrawPerform';

function EditInvestmentModal({
  close,
  ...props
}: {
  close: () => void;
} & DialogProps): React.ReactElement {
  const service = useSelectedInvestment();
  const { isLoading } = useInvestmentDetails(service.serviceId);
  const { isLoading: isLoadingCoins } = useStoredCoins();

  const [view, setView] = useState<EditInvestmentViews>(
    EditInvestmentViews.WithdrawInvestment,
  );

  const { t } = useTranslation(['edit-investment', 'withdraw-your-investment']);

  const views = {
    [EditInvestmentViews.WithdrawInvestment]: {
      title: t('edit-investment.modal.withdrawInvestment.title'),
      component: () => <WithdrawFunds />,
    },
    [EditInvestmentViews.WithdrawPerform]: {
      title: t('withdraw-your-investment:withdraw-your-investment.title'),
      component: () => <WithdrawPerform />,
    },
    [EditInvestmentViews.PendingTransactions]: {
      title: t('edit-investment.modal.pendingTransaction.title'),
      component: () => <PendingTransactionsList setView={setView} />,
    },
    [EditInvestmentViews.EditInvestment]: {
      title: t('edit-investment.modal.editInvestments.title'),
      component: () => <EditInvestment setView={setView} />,
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
          view !== EditInvestmentViews.EditInvestment
            ? () => setView(EditInvestmentViews.EditInvestment)
            : undefined
        }
      >
        {isLoading || isLoadingCoins ? (
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
