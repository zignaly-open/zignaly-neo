import React from 'react';
import EditInvestmentForm from '../forms/EditInvestmentForm';
import { ChangeViewFn, EditInvestmentViews } from '../types';
import InvestorDetails from './InvestorDetails';
import PendingTransactions from './PendingTransactions';
import { Box } from '@mui/material';

const EditInvestment: React.FC<{
  setView: ChangeViewFn;
  close: () => void;
}> = ({ setView, close }) => {
  return (
    <Box paddingX='30px'>
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
    </Box>
  );
};

export default EditInvestment;
