import React from 'react';
import WithdrawForm from '../forms/WithdrawForm';
import { ChangeViewFn } from '../types';

const WithdrawPerform: React.FC<{ setView: ChangeViewFn }> = ({ setView }) => {
  return <WithdrawForm setView={setView} />;
};

export default WithdrawPerform;
