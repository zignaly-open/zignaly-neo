import React from 'react';
import InvestForm from '../forms/InvestForm';
import InvestorDetails from './InvestorDetails';
import EditInvestmentSuccess from './EditInvestmentSuccess';

const Invest: React.FC<{
  close: () => void;
  isInvested: boolean;
  setIsInvested: (v: boolean) => void;
}> = ({ close, isInvested, setIsInvested }) => {
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
