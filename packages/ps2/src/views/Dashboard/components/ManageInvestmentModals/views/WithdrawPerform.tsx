import React from 'react';
import WithdrawInvestmentForm from '../forms/WithdrawInvestmentForm';
import { ChangeViewFn } from '../types';

const WithdrawPerform: React.FC<{ setView: ChangeViewFn }> = ({ setView }) => {
  return <WithdrawInvestmentForm setView={setView} />;
};

export default WithdrawPerform;
