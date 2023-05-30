import React, { useMemo } from 'react';
import { TransactionContainer } from '../styles';
import { ZigButton, ZigTable, ZigTablePriceLabel } from '@zignaly-open/ui';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
import { ColumnDef } from '@tanstack/react-table';
import { Box } from '@mui/material';

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
        amount: details.pending,
        type: t('pendingMajorThan.type'),
        status: t('pendingMajorThan.status'),
      });
    }
    if (details.profitOut > 0) {
      fields.push({
        amount: details.profitOut,
        type: t('profitOutMajorThan.type'),
        status: t('profitOutMajorThan.status'),
      });
    }

    if (details.transferOut > 0) {
      fields.push({
        amount: details.transferOut,
        type: t('transferOutMajorThan.type'),
        status: t('transferOutMajorThan.status'),
      });
    }

    return fields;
  }, [details?.pending, details?.transferOut, details?.profitOut, coin, t]);

  return (
    <>
      <TransactionContainer>
        <ZigTable
          prefixId={'pending-transactions'}
          columns={
            [
              {
                header: t('modal.pendingTransaction.tableHeader.amount'),
                accessorKey: 'amount',
                cell: (props) => (
                  <ZigTablePriceLabel
                    id={`pending-transactions-table__amount-${props.row.id}`}
                    coin={coin.id}
                    value={props.getValue()}
                  />
                ),
                sortingFn: 'alphanumeric',
              },
              {
                header: t('modal.pendingTransaction.tableHeader.type'),
                accessorKey: 'type',
                cell: (props) => (
                  <Box id={`pending-transactions-table__type-${props.row.id}`}>
                    {props.getValue()}
                  </Box>
                ),
              },
              {
                header: t('modal.pendingTransaction.tableHeader.status'),
                accessorKey: 'status',
                cell: (props) => (
                  <Box
                    id={`pending-transactions-table__status-${props.row.id}`}
                  >
                    {props.getValue()}
                  </Box>
                ),
              },
            ] as ColumnDef<
              typeof pendingTransactionsList[number],
              string | number
            >[]
          }
          data={pendingTransactionsList}
          columnVisibility={false}
          pagination={false}
        />
      </TransactionContainer>

      <ModalActions>
        <ZigButton
          id={'pending-transactions__close'}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => setView(EditInvestmentViews.EditInvestment)}
          size={'large'}
          variant={'contained'}
        >
          {t('modal.pendingTransaction.button')}
        </ZigButton>
      </ModalActions>
    </>
  );
};

export default PendingTransactionsList;
