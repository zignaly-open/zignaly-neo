import React from 'react';
import EditInvestmentForm from '../forms/EditInvestmentForm';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';
import { useCanInvestOut } from '../../../../../util/walls/util';

const EditInvestment: React.FC<{
  setView: ChangeViewFn;
  close: () => void;
}> = ({ setView, close }) => {
  const canInvestOut = useCanInvestOut();
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
          canInvestOut() && setView(EditInvestmentViews.WithdrawInvestment)
        }
      />
    </>
  );
};

export default EditInvestment;
