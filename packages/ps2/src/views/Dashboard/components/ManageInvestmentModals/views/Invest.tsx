import React from 'react';
import InvestForm from '../forms/InvestForm';
import InvestorDetails from './InvestorDetails';
import EditInvestmentSuccess from './EditInvestmentSuccess';
import { Box } from '@mui/material';
import { InvestmentViews } from '../types';

const Invest: React.FC<{
  close: () => void;
  view: InvestmentViews;
  setView: (view: InvestmentViews) => void;
}> = ({ close, view, setView }) => {
  return view === InvestmentViews.InvestmentSuccess ? (
    <EditInvestmentSuccess close={close} />
  ) : (
    <Box paddingX='30px'>
      <InvestorDetails prefixId={'invest-modal'} />
      <InvestForm close={close} view={view} setView={setView} />
    </Box>
  );
};

export default Invest;
