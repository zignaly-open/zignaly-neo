import React from 'react';
import InvestForm from '../forms/InvestForm';
import InvestorDetails from './InvestorDetails';
import EditInvestmentSuccess from './EditInvestmentSuccess';
import { Box } from '@mui/material';

const Invest: React.FC<{
  close: () => void;
  isInvested: boolean;
  setIsInvested: (v: boolean) => void;
}> = ({ close, isInvested, setIsInvested }) => {
  return isInvested ? (
    <EditInvestmentSuccess close={close} />
  ) : (
    <Box paddingX='30px'>
      <InvestorDetails prefixId={'invest-modal'} />
      <InvestForm close={close} onInvested={() => setIsInvested(true)} />
    </Box>
  );
};

export default Invest;
