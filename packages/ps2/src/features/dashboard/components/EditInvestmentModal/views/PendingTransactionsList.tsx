import React, { useMemo } from 'react';
import { TransactionContainer } from '../styles';
import { ArrowLeftIcon, Button, PriceLabel, Table } from '@zignaly-open/ui';
import {
  ChangeViewFn,
  EditInvestmentViews,
  PendingTransactionListItemType,
} from '../types';
import { useTranslation } from 'react-i18next';
import {
  useCurrentBalance,
  useInvestmentDetails,
  useSelectedInvestment,
} from '../../../use';
import { ModalActions } from 'components/ModalContainer/styles';

const PendingTransactionsList: React.FC<{
  setView: ChangeViewFn;
}> = ({ setView }) => {
  const { serviceId } = useSelectedInvestment();
  const { data: details } = useInvestmentDetails(serviceId);
  const { t } = useTranslation('edit-investment');
  const coin = useCurrentBalance();

  const pendingTransactionsList = useMemo(() => {
    const fields: PendingTransactionListItemType[] = [];

    if (!details) {
      return fields;
    }

    if (details.pending > 0) {
      fields.push({
        amount: <PriceLabel coin={coin.id} value={details.pending} />,
        type: t('edit-investment.pendingMajorThan.type'),
        status: t('edit-investment.pendingMajorThan.status'),
      });
    }
    if (details.profitOut > 0) {
      fields.push({
        amount: <PriceLabel coin={coin.id} value={details.profitOut} />,
        type: t('edit-investment.profitOutMajorThan.type'),
        status: t('edit-investment.profitOutMajorThan.status'),
      });
    }

    if (details.transferOut > 0) {
      fields.push({
        amount: <PriceLabel coin={coin.id} value={details.transferOut} />,
        type: t('edit-investment.transferOutMajorThan.type'),
        status: t('edit-investment.transferOutMajorThan.status'),
      });
    }

    return fields;
  }, [details?.pending, details?.transferOut, details?.profitOut, coin]);

  return (
    <>
      <TransactionContainer>
        <Table
          columns={[
            {
              Header: t(
                'edit-investment.modal.pendingTransaction.tableHeader.amount',
              ),
              accessor: 'amount',
            },
            {
              Header: t(
                'edit-investment.modal.pendingTransaction.tableHeader.type',
              ),
              accessor: 'type',
            },
            {
              Header: t(
                'edit-investment.modal.pendingTransaction.tableHeader.status',
              ),
              accessor: 'status',
            },
          ]}
          data={pendingTransactionsList}
          hideOptionsButton={true}
          isUserTable={false}
        />
      </TransactionContainer>

      <ModalActions>
        <Button
          leftElement={
            <ArrowLeftIcon color={'#fff'} width={'20px'} height={'20px'} />
          }
          onClick={() => setView(EditInvestmentViews.EditInvestment)}
          size={'large'}
          caption={t('edit-investment.modal.pendingTransaction.button')}
        />
      </ModalActions>
    </>
  );
};

export default PendingTransactionsList;
