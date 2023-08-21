import React from 'react';
import InvestForm from '../forms/InvestForm';
import InvestorDetails from './InvestorDetails';
import EditInvestmentSuccess from './EditInvestmentSuccess';
import { InvestmentViews } from '../types';

const Invest: React.FC<{
  close: () => void;
  view: InvestmentViews;
  setView: (view: InvestmentViews) => void;
}> = ({ close, view, setView }) => {
  return view === InvestmentViews.InvestmentSuccess ? (
    <EditInvestmentSuccess close={close} />
  ) : (
    <>
      <InvestorDetails prefixId={'invest-modal'} />
      <InvestForm close={close} view={view} setView={setView} />
    </>
  );
};

export default Invest;
