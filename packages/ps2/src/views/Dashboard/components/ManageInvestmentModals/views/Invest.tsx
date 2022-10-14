import React, { useState } from 'react';
import InvestForm from '../forms/InvestForm';
import InvestorDetails from './InvestorDetails';
import EditInvestmentSuccess from './EditInvestmentSuccess';

const Invest: React.FC<{ close: () => void }> = ({ close }) => {
  const [isInvested, setIsInvested] = useState(false);
  return isInvested ? (
    <EditInvestmentSuccess close={close} />
  ) : (
    <>
      <InvestorDetails />
      <InvestForm close={close} onInvested={() => setIsInvested(true)} />
    </>
  );
};

export default Invest;
