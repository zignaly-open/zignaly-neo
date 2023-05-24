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
                header: (
                  <Box position={'relative'} padding={'5px 15px'}>
                    <Box
                      component='img'
                      sx={{
                        position: 'absolute',
                        width: '10px',
                        right: 0,
                        top: 0,
                      }}
                      src={`/images/portfolio/info-icon.svg`}
                    />
                    {t('modal.pendingTransaction.tableHeader.amount')}
                  </Box>
                ),
                accessorKey: 'amount',
                cell: (props) => (
                  <ZigTablePriceLabel
                    coin={coin.id}
                    value={props.getValue()}
                    showApproximate
                  />
                ),
                sortingFn: 'alphanumeric',
              },
              {
                header: t('modal.pendingTransaction.tableHeader.type'),
                accessorKey: 'type',
              },
              {
                header: t('modal.pendingTransaction.tableHeader.status'),
                accessorKey: 'status',
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
          id={'pending__pending-transactions'}
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
