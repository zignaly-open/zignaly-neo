import React, { useMemo } from 'react';
import { TransactionContainer } from '../styles';
import { ArrowLeftIcon, Button, ZigPriceLabel, Table } from '@zignaly-open/ui';
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
} from '../../../../../apis/investment/use';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';

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
        amount: <ZigPriceLabel exact coin={coin.id} value={details.pending} />,
        type: t('pendingMajorThan.type'),
        status: t('pendingMajorThan.status'),
      });
    }
    if (details.profitOut > 0) {
      fields.push({
        amount: (
          <ZigPriceLabel exact coin={coin.id} value={details.profitOut} />
        ),
        type: t('profitOutMajorThan.type'),
        status: t('profitOutMajorThan.status'),
      });
    }

    if (details.transferOut > 0) {
      fields.push({
        amount: (
          <ZigPriceLabel exact coin={coin.id} value={details.transferOut} />
        ),
        type: t('transferOutMajorThan.type'),
        status: t('transferOutMajorThan.status'),
      });
    }

    return fields;
  }, [details?.pending, details?.transferOut, details?.profitOut, coin, t]);

  return (
    <>
      <TransactionContainer>
        <Table
          columns={[
            {
              Header: t('modal.pendingTransaction.tableHeader.amount'),
              accessor: 'amount',
            },
            {
              Header: t('modal.pendingTransaction.tableHeader.type'),
              accessor: 'type',
            },
            {
              Header: t('modal.pendingTransaction.tableHeader.status'),
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
          caption={t('modal.pendingTransaction.button')}
        />
      </ModalActions>
    </>
  );
};

export default PendingTransactionsList;
