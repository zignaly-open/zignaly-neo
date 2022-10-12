import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditInvestmentViews, PendingTransactionListItemType } from './types';
import { DialogProps } from '@mui/material/Dialog';
import EditInvestment from './views/EditInvestment';
import WithdrawFunds from './views/WithdrawFunds';
import PendingTransactionsList from './views/PendingTransactionsList';
import {
  useCurrentBalance,
  useInvestmentDetails,
  useIsInvestedInService,
  useSelectedInvestment,
} from '../../../../apis/investment/use';
import WithdrawPerform from './views/WithdrawPerform';
import EditInvestmentSuccess from './views/EditInvestmentSuccess';
import WithdrawModalSuccess from './views/WithdrawSuccess';
import { useServiceDetails } from '../../../../apis/service/use';
import { useCoinBalances } from '../../../../apis/coin/use';
import ZModal from '../../../../components/ZModal';
import { Service } from '../../../../apis/service/types';
import { ArrowLeftIcon, Button, PriceLabel, Table } from '@zignaly-open/ui';
import { TransactionContainer } from './styles';

function InvestedFromOtherAccounts({
  close,
  service,
  ...props
}: {
  close: () => void;
  service: Service;
} & DialogProps): React.ReactElement {
  const isInvested = useIsInvestedInService(service.id);
  const { t } = useTranslation('service');
  const allInvestedServices = useMemo(() => {
    return [
      {
        account: 'hui',
        invested: 'hui',
      },
    ];
  }, []);

  return (
    <ZModal
      {...props}
      close={close}
      title={t('other-accounts.title')}
      isLoading={isInvested.isLoading}
    >
      <Table
        columns={[
          {
            Header: t('modal.pendingTransaction.tableHeader.amount'),
            accessor: 'account',
          },
          {
            Header: t('modal.pendingTransaction.tableHeader.type'),
            accessor: 'invested',
          },
          {
            Header: '',
            accessor: 'account',
          },
        ]}
        data={allInvestedServices}
        hideOptionsButton={true}
        isUserTable={false}
      />
    </ZModal>
  );
}

export default InvestedFromOtherAccounts;
