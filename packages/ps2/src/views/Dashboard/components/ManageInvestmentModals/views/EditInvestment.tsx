import { useSelectedInvestment } from 'apis/investment/use';
import React from 'react';
import EditInvestmentForm from '../forms/EditInvestmentForm';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';

const EditInvestment: React.FC<{ setView: ChangeViewFn; close: () => void }> =
  ({ setView, close }) => {
    const service = useSelectedInvestment();
    return (
      <>
        <InvestorDetails service={service} />
        <PendingTransactions setView={setView} />
        <EditInvestmentForm
          close={close}
          setView={setView}
          onClickWithdrawInvestment={() =>
            setView(EditInvestmentViews.WithdrawInvestment)
          }
        />
      </>
    );
  };

export default EditInvestment;
