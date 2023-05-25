import React from 'react';
import EditInvestmentForm from '../forms/EditInvestmentForm';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';

const EditInvestment: React.FC<{
  setView: ChangeViewFn;
  close: () => void;
}> = ({ setView, close }) => {
  return (
    <>
      <InvestorDetails prefixId={'edit-investment-modal'} />
      <PendingTransactions
        setView={setView}
        prefixId={'edit-investment-modal'}
      />
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
